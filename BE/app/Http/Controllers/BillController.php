<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use Illuminate\Http\Request;

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
            'total_popcorn'=>$total_popcorn,
            'total_combo' => $total_combo,
            'discount_code' => $discount_code,
             'additional_fee' => $additional_fee,
             'total_money' => $total_money,
             'payment_time'=>$payment_time,
             'status' => $status,
        ];

        $newBill = Bill::create($data);
        return response()->json($newBill,["message" =>  "create successfully"]);
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
        if(!empty($bill)){
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
            "message" => "delete successfully"
        ]);
    }
}
