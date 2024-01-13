<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bills = Bill::all();
        return response()->json($bills);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userId = $request->get('user_id');
        $personnel_id = $request->get('personnel_id');
        $total_ticket = $request->get('total_ticket');
        $total_drink = $request->get('total_drink');
        $total_popcorn = $request->get('total_popcorn');
        $total_combo = $request->get('total_combo');
        $discount_code = $request->get('discount_code');
        $additional_fee = $request->get('additional_fee');
        $total_money = $request->get('total_money');
        $payment_time = $request->get('payment_time');
        $status = $request->get('status');

        $data = [
            'user_code' => $userId,
            'personnal_id' => $personnel_id,
            'total_ticket' => $total_ticket,
            'total_drink' => $total_drink,
            'total_popcorn' => $total_popcorn,
            'total_combo' => $total_combo,
            'discount_code' => $discount_code,
            'additional_fee' => $additional_fee,
            'total_money' => $total_money,
            'payment_time' => $payment_time,
            'status' => $status,
        ];

        $newBill = Bill::create($data);
        return response()->json($newBill, ["message" =>  "create successfully"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bill = Bill::find($id);
        if (!empty($bill)) {
            return response()->json($bill);
        } else {
            return response()->json([
                "message" => "khong tim thay bill"
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $bill = Bill::find($id);
        return response()->json($bill);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $bill = Bill::find($id);
        $bill->update($request->all());
        return response()->json([
            "message" => "update bill successfully !"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bill = Bill::find($id);
        $bill->delete();
        return response()->json([
            "message" => "xóa thành công"
        ]);
    }


    //lịch sử đặt vé

    public function history(Request $request)
    {
        $bills = Bill::leftjoin('users', 'users.user_code', '=', 'bills.user_code')
            ->leftjoin('personnels', 'personnels.personnel_code', '=', 'bills.personnel_code')
            ->join('tickets', 'tickets.bill_id', '=', 'bills.id')
            ->join('showtimes', 'showtimes.id', '=', 'tickets.showtime_id')
            ->join('movies', 'movies.id', '=', 'showtimes.movie_id')
            ->select(
                'bills.id',
                'bills.user_code',
                'users.name as user_name',
                'bills.personnel_code',
                'personnels.name as personnel_name',
                'bills.total_ticket',
                'bills.total_combo',
                'bills.additional_fee',
                'bills.total_money',
                'movies.movie_name',
                'movies.image',
                DB::raw('DATE_FORMAT(bills.created_at, "%d-%m-%Y") as booking_date'),
                DB::raw('DATE_FORMAT(showtimes.show_date, "%d-%m-%Y") as show_date'),
                DB::raw('CASE 
                WHEN bills.status = 0 THEN "Đang chờ thanh toán" 
                WHEN bills.status = 1 THEN "Đã thanh toán" 
                WHEN bills.status = 2 THEN "Đã hủy" 
                END as payment_status')
            )
            ->groupBy(
                'bills.id',
                'bills.user_code',
                'users.name',
                'bills.personnel_code',
                'personnels.name',
                'bills.total_ticket',
                'bills.total_combo',
                'bills.additional_fee',
                'bills.total_money',
                'movies.movie_name',
                'movies.image',
                'booking_date',
                'show_date',
                'payment_status'
            )
            ->get();
        return response()->json($bills);
    }
}
