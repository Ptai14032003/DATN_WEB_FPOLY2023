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
        if ($data['timeline'] == "year") {
            $total_revenue = [];
            $currentYear = Carbon::now()->year;
            $currentMonth = Carbon::now()->month;

            $bills = Bill::where("status", 1)
                ->whereYear("bills.updated_at", '=', $data['year'])
                ->select(
                    DB::raw("SUM(total_money) as total"),
                    DB::raw("COUNT(bills.id) as quantity")
                )
                ->first();

            if ($bills->quantity > 0) {
                $total_revenue['quantity_bill'] = $bills->quantity;
                $total_revenue['total_money'] = $bills->total;
                $tickets = Ticket::join("bills", "bills.id", "=", "tickets.bill_id")
                    ->where("bills.status", 1)
                    ->whereYear("bills.updated_at", '=', $data['year'])
                    ->select(
                        DB::raw("SUM(price) as total")
                    )
                    ->first();

                $total_revenue['total_money_ticket'] = $tickets->total;
                $total_revenue['percent_ticket'] = round($tickets->total / $bills->total * 100, 2);

                $foods = Ticket_Food::join("bills", "bills.id", "=", "ticket_foods.bill_id")
                    ->where("bills.status", 1)
                    ->whereYear("bills.updated_at", '=', $data['year'])
                    ->select(
                        DB::raw("SUM(ticket_foods.total_money) as total")
                    )
                    ->first();

                $total_revenue['total_money_food'] = $foods->total;
                $total_revenue['percent_food'] = round($foods->total / $bills->total * 100, 2);

                if ($data['year'] == $currentYear) {
                    $monthlyRevenue = [];

                    for ($month = 1; $month <= $currentMonth; $month++) {
                        $firstDay = Carbon::create($currentYear, $month, 1);

                        $lastDay = $firstDay->copy()->endOfMonth();

                        $sum = Bill::whereBetween('updated_at', [$firstDay, $lastDay])
                            ->where('status', 1)
                            ->select(DB::raw('COALESCE(SUM(total_money), 0) as total_money'))
                            ->value('total_money');

                        $monthlyRevenue[] = [
                            'month' => $month,
                            'total_money' => $sum
                        ];
                    }
                } else {
                    $allMonths = range(1, 12);

                    $year = $data['year'];

                    // Tính toán doanh thu từng tháng
                    $monthlyRevenue = DB::table(DB::raw('(SELECT 1 as month) as months'))
                        ->crossJoin(DB::raw('(SELECT DISTINCT 1 as month UNION SELECT 2 UNION SELECT 3 UNION 
                        SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 
                        UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) as all_months'))
                        ->leftJoin('bills', function ($join) use ($year) {
                            $join->on(DB::raw('MONTH(bills.updated_at)'), '=', 'all_months.month')
                                ->whereYear('bills.updated_at', $year);
                        })
                        ->select('all_months.month', DB::raw('COALESCE(SUM(bills.total_money), 0) as total_money'))
                        ->whereIn("all_months.month", $allMonths)
                        ->groupBy('all_months.month')
                        ->orderBy('all_months.month')
                        ->get();
                }
                $total_revenue['monthlyRevenue'] = $monthlyRevenue;
                return response()->json($total_revenue);
            } else {
                return response()->json(["message" => "Không có dữ liệu thống kê của năm " . $data['year']]);
            }
        } elseif ($data['timeline'] == "month") {
            
        }
    }
}
