<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Food;
use App\Models\Movie;
use App\Models\Personnel;
use App\Models\Ticket;
use App\Models\Ticket_Food;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{
    // thống kê theo tên phim  từ ngày đến ngày
    public function revenue_movie(Request $request)
    {
        $data = $request->all();
        $startTimestamp = strtotime($data['start']);
        $endTimestamp = strtotime($data['end']);

        // Kiểm tra nếu start > end
        if ($startTimestamp > $endTimestamp) {
            return response()->json(['error' => 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc.']);
        }
        $revenue = Movie::join("showtimes", "showtimes.movie_id", "=", "movies.id")
            ->join("tickets", "tickets.showtime_id", "=", "showtimes.id")
            ->join("bills", "bills.id", "=", "tickets.bill_id")
            ->where("movies.movie_name", $data['movie_name'])
            ->where(function ($query) use ($data) {
                $query->whereRaw("CONVERT_TZ(bills.updated_at, '+00:00', '+07:00') BETWEEN ? AND ?", [$data['start'], $data['end']])
                    ->orWhereDate(DB::raw("CONVERT_TZ(bills.updated_at, '+00:00', '+07:00')"), $data['start']);
            })
            ->where("bills.status", 1)
            ->select(
                "movies.movie_name",
                "movies.start_date",
                DB::raw("COUNT(tickets.id) as total_tickets_sold"),
                DB::raw("SUM(tickets.price) as total_revenue")
            )
            ->groupBy("movies.movie_name", "movies.start_date")
            ->get();
        if (count($revenue)) {
            return response()->json($revenue);
        } else {
            if ($startTimestamp == $endTimestamp) {
                return response()->json(["message" => "Không có dữ liệu thống kê doanh thu phim " . $data['movie_name'] . " ngày " . $data['start']]);
            } else {
                return response()->json(["message" => "Không có dữ liệu thống kê doanh thu phim " . $data['movie_name'] . " từ ngày " . $data['start'] . " đến ngày " . $data['end']]);
            }
        }
    }

    //thống kê doanh thu phim theo tháng(từng ngày), năm(từng tháng)

    public function total_revenue(Request $request)
    {
        $data = $request->all();
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        //kiểm tra nếu năm > hiện tại, hoặc tháng >tháng hiện tại (tháng cần thống kê của năm hiện tại)
        if (($data['timeline'] == 'year' && $data['year'] > $currentYear) ||
            ($data['timeline'] == 'month' && ($data['year'] > $currentYear || ($data['year'] == $currentYear && $data['month'] > $currentMonth)))
        ) {
            return response()->json(['error' => 'Không thể xuất doanh thu.']);
        }
        $total_revenue = [];
        //lấy ra tổng doanh thu của tháng hoặc năm
        $bills = Bill::where("status", 1)
            ->when(($data['timeline'] == "month"), function ($query) use ($data) {
                return $query->whereYear("bills.updated_at", $data['year'])
                    ->whereMonth("bills.updated_at", $data['month']);
            }, function ($query) use ($data) {
                return $query->whereYear("bills.updated_at", $data['year']);
            })
            ->select(
                DB::raw("SUM(total_money) as total"),
                DB::raw("COUNT(bills.id) as quantity")
            )
            ->first();
        $total_revenue['quantity_bill'] = $bills->quantity;
        $total_revenue['total_money'] = $bills->total ?? 0;

        $tickets = Ticket::join("bills", "bills.id", "=", "tickets.bill_id")
            ->where("bills.status", 1)
            ->when(($data['timeline'] == "month"), function ($query) use ($data) {
                return $query->whereYear("bills.updated_at", $data['year'])
                    ->whereMonth("bills.updated_at", $data['month']);
            }, function ($query) use ($data) {
                return $query->whereYear("bills.updated_at", $data['year']);
            })
            ->select(DB::raw("SUM(price) as total"))
            ->first();

        $foods = Ticket_Food::join("bills", "bills.id", "=", "ticket_foods.bill_id")
            ->where("bills.status", 1)
            ->when(($data['timeline'] == "month"), function ($query) use ($data) {
                return $query->whereYear("bills.updated_at", $data['year'])
                    ->whereMonth("bills.updated_at", $data['month']);
            }, function ($query) use ($data) {
                return $query->whereYear("bills.updated_at", $data['year']);
            })
            ->select(DB::raw("SUM(ticket_foods.total_money) as total"))
            ->first();

        if ($bills->quantity > 0) {
            $total_revenue['total_money_ticket'] = $tickets->total;
            $total_revenue['percent_ticket'] = round($tickets->total / $bills->total * 100, 2);
            $total_revenue['total_money_food'] = $foods->total;
            $total_revenue['percent_food'] = round($foods->total / $bills->total * 100, 2);
        } else {
            $total_revenue += [
                'total_money_ticket' => 0,
                'percent_ticket' => 0,
                'total_money_food' => 0,
                'percent_food' => 0,
            ];
        }

        if ($data['timeline'] == 'year') {
            $selectedMonths = $data['year'] == $currentYear ? range(1, $currentMonth) : range(1, 12);

            $monthlyRevenue = [];

            foreach ($selectedMonths as $month) {
                $firstDay = Carbon::create($data['year'], $month, 1);
                $lastDay = $firstDay->copy()->endOfMonth();

                $sum = Bill::whereBetween('updated_at', [$firstDay, $lastDay])
                    ->where('status', 1)
                    ->select(DB::raw('COALESCE(SUM(total_money), 0) as total_money'))
                    ->value('total_money');

                $monthlyRevenue[] = ['month' => $month, 'total_money' => $sum];
            }

            $total_revenue['monthlyRevenue'] = $monthlyRevenue;
        }

        if ($data['timeline'] == 'month') {
            $firstDay = Carbon::createFromDate($data['year'], $data['month'], 1);
            $lastDay = now()->endOfMonth();

            if ($firstDay->isCurrentMonth() && now()->isToday()) {
                $lastDay = now(); // Nếu là tháng hiện tại và ngày hiện tại, sẽ đặt $lastDay thành now()
            }

            $dailyRevenue = [];

            while ($firstDay->lte($lastDay) && $firstDay->month == $data['month']) {
                $dailySum = Bill::whereDate('updated_at', $firstDay)
                    ->where('status', 1)
                    ->sum('total_money');

                $dailyRevenue[] = ['date' => $firstDay->day, 'total_money' => $dailySum];
                $firstDay->addDay();
            }

            $total_revenue['dailyRevenue'] = $dailyRevenue;
        }
        if ($total_revenue['total_money'] == 0) {
            if ($data['timeline'] == 'year') {
                return response()->json(["message" => "Không có dữ liệu thống kê tổng doanh thu năm " . $data['year']]);
            } else {
                return response()->json(["message" => "Không có dữ liệu thống kê tổng doanh thu tháng " . $data['month'] . " năm " . $data['year']]);
            }
        } else {
            return response()->json($total_revenue);
        }
    }

    //thống kê 5 phim hot nhất (doanh thu cao nhất)
    public function get_top5_movie(Request $request)
    {
        $data = $request->all();
        $year = $data['year'];
        $timeline = $data['timeline'];

        $movies = Movie::join("showtimes", "showtimes.movie_id", "=", "movies.id")
            ->join("tickets", "tickets.showtime_id", "=", "showtimes.id")
            ->join("bills", "bills.id", "=", "tickets.bill_id")
            ->where("bills.status", 1);

        if ($timeline == 'month') {
            $month = $data['month'];
            $movies->whereMonth("bills.updated_at", $month)
                ->whereYear("bills.updated_at", $year);
        } elseif ($timeline == 'year') {
            $movies->whereYear("bills.updated_at", $year);
        }

        $result = $movies->select(
            "movies.movie_name",
            DB::raw("COUNT(tickets.id) as total_tickets_sold"),
            DB::raw("SUM(tickets.price) as total_revenue")
        )
            ->groupBy("movies.movie_name", "movies.start_date")
            ->orderByDesc("total_revenue")
            ->take(5)
            ->get();
        if (count($result) == 0) {
            if ($data['timeline'] == 'year') {
                return response()->json(["message" => "Không có dữ liệu thống kê top 5 phim có doanh thu cao nhất năm " . $data['year']]);
            } else {
                return response()->json(["message" => "Không có dữ liệu thống kê top 5 phim có doanh thu cao nhất tháng " . $data['month'] . " năm " . $data['year']]);
            }
        } else {
            return response()->json($result);
        }
    }


    //thống kê 5 sản phẩm bán chạy nhất (số lượng nhiều nhất)

    public function get_top5_food(Request $request)
    {
        $data = $request->all();

        $year = $data['year'];
        $timeline = $data['timeline'];

        $foods = Food::join("ticket_foods", "ticket_foods.food_id", "=", "foods.id")
            ->join("bills", "bills.id", "=", "ticket_foods.bill_id")
            ->where("bills.status", 1);

        if ($timeline == 'month') {
            $month = $data['month'];
            $foods->whereMonth("bills.updated_at", $month)
                ->whereYear("bills.updated_at", $year);
        } elseif ($timeline == 'year') {
            $foods->whereYear("bills.updated_at", $year);
        }

        $result = $foods->select(
            "foods.food_name",
            DB::raw("SUM(ticket_foods.quantity) as total_quantity_sold"),
            DB::raw("SUM(ticket_foods.total_money) as total_revenue")
        )
            ->groupBy("foods.food_name")
            ->orderByDesc("total_revenue")
            ->take(5)
            ->get();
        if (count($result) == 0) {
            if ($data['timeline'] == 'year') {
                return response()->json(["message" => "Không có dữ liệu thống kê top 5 sản phẩm bán chạy nhất năm " . $data['year']]);
            } else {
                return response()->json(["message" => "Không có dữ liệu thống kê top 5 sản phẩm bán chạy nhất tháng " . $data['month'] . " năm " . $data['year']]);
            }
        } else {
            return response()->json($result);
        }
    }


    //top 5 khách hàng chi tiêu nhiều nhất

    public function get_top5_user(Request $request)
    {
        $data = $request->all();

        $year = $data['year'];
        $timeline = $data['timeline'];

        $users = User::leftjoin("bills", "bills.user_code", "=", "users.user_code")
            ->where("bills.status", 1);

        if ($timeline == 'month') {
            $month = $data['month'];
            $users->whereMonth("bills.updated_at", $month)
                ->whereYear("bills.updated_at", $year);
        } elseif ($timeline == 'year') {
            $users->whereYear("bills.updated_at", $year);
        }

        $result = $users->select(
            "users.name",
            "users.user_code",
            "users.email",
            "users.phone_number",
            DB::raw("SUM(bills.total_money) as total_spent")
        )
            ->groupBy("users.name", "users.user_code", "users.email", "users.phone_number")
            ->orderByDesc("total_spent")
            ->take(5)
            ->get();

        if (count($result) == 0) {
            if ($data['timeline'] == 'year') {
                return response()->json(["message" => "Không có dữ liệu thống kê top 5 khách hàng chi tiêu nhiều nhất năm " . $data['year']]);
            } else {
                return response()->json(["message" => "Không có dữ liệu thống kê top 5 khách hàng chi tiêu nhiều nhất tháng " . $data['month'] . " năm " . $data['year']]);
            }
        } else {
            return response()->json($result);
        }
    }

    //top 5 nhân viên bán được doanh thu nhiều nhất
    public function get_top5_personnel(Request $request)
    {
        $data = $request->all();

        $year = $data['year'];
        $timeline = $data['timeline'];

        $users = Personnel::leftjoin("bills", "bills.personnel_code", "=", "personnels.personnel_code")
            ->where("bills.status", 1);

        if ($timeline == 'month') {
            $month = $data['month'];
            $users->whereMonth("bills.updated_at", $month)
                ->whereYear("bills.updated_at", $year);
        } elseif ($timeline == 'year') {
            $users->whereYear("bills.updated_at", $year);
        }

        $result = $users->select(
            "personnels.name",
            "personnels.personnel_code",
            "personnels.email",
            "personnels.phone_number",
            DB::raw("SUM(bills.total_money) as total_spent")
        )
            ->groupBy("personnels.name", "personnels.personnel_code", "personnels.email", "personnels.phone_number")
            ->orderByDesc("total_spent")
            ->take(5)
            ->get();

        if (count($result) == 0) {
            if ($data['timeline'] == 'year') {
                return response()->json(["message" => "Không có dữ liệu thống kê top 5 nhân viên bán được doanh thu cao nhất năm " . $data['year']]);
            } else {
                return response()->json(["message" => "Không có dữ liệu thống kê top 5 nhân viên bán được doanh thu cao nhất tháng " . $data['month'] . " năm " . $data['year']]);
            }
        } else {
            return response()->json($result);
        }
    }
}
