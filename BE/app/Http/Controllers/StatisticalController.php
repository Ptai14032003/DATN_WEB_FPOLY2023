<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Movie;
use App\Models\Ticket;
use App\Models\Ticket_Food;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{
    // thống kê theo tên phim  từ ngày đến ngày
    public function revenue_movie(Request $request)
    {
        $data = $request->all();
        $revenue = Movie::join("showtimes", "showtimes.movie_id", "=", "movies.id")
            ->join("tickets", "tickets.showtime_id", "=", "showtimes.id")
            ->join("bills", "bills.id", "=", "tickets.bill_id")
            ->where("movies.movie_name", $data['movie_name'])
            ->whereRaw("CONVERT_TZ(bills.updated_at, '+00:00', '+07:00') BETWEEN ? AND ?", [$data['start'], $data['end']])
            ->where("bills.status", 1)
            ->select(
                "movies.movie_name",
                "movies.start_date",
                DB::raw("COUNT(tickets.id) as total_tickets_sold"),
                DB::raw("SUM(tickets.price) as total_revenue")
            )
            ->groupBy("movies.movie_name", "movies.start_date")
            ->get();

        return response()->json($revenue);
    }

    //thống kê doanh thu phim theo tháng(từng ngày), năm(từng tháng)

    public function total_revenue(Request $request)
    {
        $data = $request->all();
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        //kiểm tra nếu năm > hiện tại, hoặc tháng >tháng hiện tại (tháng cần thống kê của năm hiện tại)
        if (($data['timeline'] == 'year' && $data['year'] > $currentYear) || 
            ($data['timeline'] == 'month' && ($data['year'] > $currentYear || ($data['year'] == $currentYear && $data['month'] > $currentMonth)))) {
            return response()->json(['error' => 'Không thể xuất doanh thu.']);
        }
        $total_revenue = [];
        $bills = Bill::where("status", 1)
            ->when(isset($data['month']), function ($query) use ($data) {
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
            ->when(isset($data['month']), function ($query) use ($data) {
                return $query->whereYear("bills.updated_at", $data['year'])
                    ->whereMonth("bills.updated_at", $data['month']);
            }, function ($query) use ($data) {
                return $query->whereYear("bills.updated_at", $data['year']);
            })
            ->select(DB::raw("SUM(price) as total"))
            ->first();

        $foods = Ticket_Food::join("bills", "bills.id", "=", "ticket_foods.bill_id")
            ->where("bills.status", 1)
            ->when(isset($data['month']), function ($query) use ($data) {
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

        return response()->json($total_revenue);
    }
}
