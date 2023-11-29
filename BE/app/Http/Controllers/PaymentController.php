<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Food;
use App\Models\Ticket;
use App\Models\Ticket_Food;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function vnpay_payment(Request $request)
    {
        // thêm hóa đơn vào đb
        $showtime_id = $request->show_time;
        $seat = $request->seat;
        $combo = $request->combo;
        $total_money = $request->total_money;
        $bill = [
            "total_ticket" => count($seat),
            "total_combo" => count($combo),
            "total_money" => $total_money,
            "payment_time" => date("Y-m-d H:i:s"),
            "status" => 0
        ];
        $bill_add = Bill::create($bill);
        for ($i = 0; $i < count($seat); $i++) {
            $ticket = [
                'id_seat' => $seat[$i]['id'],
                'showtime_id' => $showtime_id,
                'bill_id' => $bill_add->id,
                'price' => $seat[$i]['price'],
                'time' => date("Y-m-d H:i:s")
            ];
            Ticket::create($ticket);
        }
        for ($i = 0; $i < count($combo); $i++) {
            $food = Food::where('food_name', 'like', $combo[$i]['name'])->first();

            $food = [
                'quantity' => $combo[$i]['quantity'],
                'total_money' => $food->price * $combo[$i]['quantity'],
                'food_id' => $food->id,
                'bill_id' => $bill_add->id
            ];
            Ticket_Food::create($food);
        }
        // return response()->json(
        //     $bill_add
        // );

        // thanh toán
        // $id_code = generateRandomString();
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $startTime = date("YmdHis");
        $expire = date('YmdHis', strtotime('+15 minutes', strtotime($startTime)));
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:5173/listvnp"; // Đường dẫn return sau khi thanh toán
        $vnp_TmnCode = "Y4S5IA1I"; //Mã website tại VNPAY 
        $vnp_HashSecret = "UDAXFZLJPNALXHWXVNNNZKOFPQAQMOHX"; //Chuỗi bí mật
        $vnp_TxnRef = $bill_add->id; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
        $vnp_OrderInfo = 'Thanh toán hóa đơn';
        $vnp_OrderType = 'billpayment';
        $vnp_Amount = $bill_add->total_money * 100;
        $vnp_Locale = 'vn';
        $vnp_BankCode = '';
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
        //Add Params of 2.0.1 Version
        $vnp_ExpireDate = $expire;

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_ExpireDate" => $vnp_ExpireDate
        );
        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }
        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00', 'message' => 'success', 'data' => $vnp_Url
        );
        // if (isset($_POST['redirect'])) {
        //     return response()->json(['url' => $vnp_Url]);
        // } else {
        //     return response()->json($returnData);
        // }
        return response()->json($vnp_Url);

        // vui lòng tham khảo thêm tại code demo
    }

    public  function check_payment(){

        return response()->json('haha');
    }
}
