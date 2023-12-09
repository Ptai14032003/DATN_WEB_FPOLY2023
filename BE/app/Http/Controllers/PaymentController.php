<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Food;
use App\Models\Ticket;
use App\Models\Ticket_Food;
use Exception;
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

    public  function check_payment(Request $request)
    {
        $inputData = array();
        $returnData = array();
        $vnp_HashSecret = "UDAXFZLJPNALXHWXVNNNZKOFPQAQMOHX";
        foreach ($request->all() as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }

        $vnp_SecureHash = $inputData['vnp_SecureHash'];
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $i = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
        $vnpTranId = $inputData['vnp_TransactionNo']; //Mã giao dịch tại VNPAY
        $vnp_BankCode = $inputData['vnp_BankCode']; //Ngân hàng thanh toán
        $vnp_Amount = $inputData['vnp_Amount'] / 100; // Số tiền thanh toán VNPAY phản hồi

        $Status = 0; // Là trạng thái thanh toán của giao dịch chưa có IPN lưu tại hệ thống của merchant chiều khởi tạo URL thanh toán.
        $bill_id = $inputData['vnp_TxnRef'];
        try {
            //Check Orderid    
            //Kiểm tra checksum của dữ liệu
            if ($secureHash == $vnp_SecureHash) {
                //Lấy thông tin đơn hàng lưu trong Database và kiểm tra trạng thái của đơn hàng, mã đơn hàng là: $bill_id            
                //Việc kiểm tra trạng thái của đơn hàng giúp hệ thống không xử lý trùng lặp, xử lý nhiều lần một giao dịch
                //Giả sử: $bill = mysqli_fetch_assoc($result);   
                $bill = Bill::find($bill_id);

                if ($bill != NULL) {
                    if ($bill["total_money"] == $vnp_Amount) //Kiểm tra số tiền thanh toán của giao dịch: giả sử số tiền kiểm tra là đúng. //$bill["Amount"] == $vnp_Amount
                    {
                        if ($bill["status"] == 0) {
                            if ($inputData['vnp_ResponseCode'] == '00' || $inputData['vnp_TransactionStatus'] == '00') {
                                $Status = 1; // Trạng thái thanh toán thành công
                                $returnData['RspCode'] = '00';
                                $returnData['Message'] = 'Thanh toán thành công';
                            } else {
                                $Status = 2; // Trạng thái thanh toán thất bại / lỗi
                                $returnData['RspCode'] = '99';
                                $returnData['Message'] = 'Thanh toán thất bại / lỗi';
                            }
                            //Cài đặt Code cập nhật kết quả thanh toán, tình trạng đơn hàng vào DB
                            Bill::where('id', $bill_id)->update(['status' => $Status]);
                        } elseif ($bill["status"] == 1) {
                            $returnData['RspCode'] = '02';
                            $returnData['Message'] = 'Đơn hàng đã được xác thực';
                        } else {
                            // Trạng thái thanh toán thất bại / lỗi
                            Bill::where('id', $bill_id)->update(['status' => 2]);
                            $returnData['RspCode'] = '99';
                            $returnData['Message'] = 'Thanh toán thất bại / lỗi';
                        }
                    } else {
                        Bill::where('id', $bill_id)->update(['status' => 2]);
                        $returnData['RspCode'] = '04';
                        $returnData['Message'] = 'Số tiền không hợp lệ';
                    }
                } else {
                    $returnData['RspCode'] = '01';
                    $returnData['Message'] = 'Không tìm thấy đơn hàng';
                }
            } else {
                $returnData['RspCode'] = '97';
                $returnData['Message'] = 'Chữ ký không hợp lệ';
            }
        } catch (Exception $e) {
            $returnData['RspCode'] = '99';
            $returnData['Message'] = 'Unknow error';
        }

        //Trả lại VNPAY theo định dạng JSON
        return response()->json($returnData);
    }
}
