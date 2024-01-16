<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Ticket;
use App\Models\Ticket_Food;
use App\Models\User;
use Carbon\Carbon;
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
        $ticket = Ticket::where('bill_id', $id)->delete();
        $ticket_food = Ticket_Food::where('bill_id', $id)->delete();
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
            ->join('seats', 'tickets.id_seat', '=', 'seats.id')
            ->join('showtimes', 'showtimes.id', '=', 'tickets.showtime_id')
            ->join('movies', 'movies.id', '=', 'showtimes.movie_id')
            ->leftJoin('ticket_foods', 'ticket_foods.bill_id', '=', 'bills.id')
            ->leftJoin('foods', 'foods.id', '=', 'ticket_foods.food_id')
            ->select(
                'bills.id',
                'bills.bill_code',
                DB::raw('IFNULL(bills.user_code, "Không có") as user_code'),
                DB::raw('IFNULL(users.name, "Không có") as user_name'),
                DB::raw('IFNULL(bills.personnel_code, "Không có") as personnel_code'),
                DB::raw('IFNULL(personnels.name, "Không có") as personnel_name'),
                'bills.total_ticket',
                'bills.total_combo',
                DB::raw('IFNULL(bills.additional_fee, 0) as additional_fee'),
                'bills.total_money',
                'movies.movie_name',
                'movies.image',
                DB::raw('DATE_FORMAT(bills.created_at, "%d-%m-%Y") as booking_date'),
                DB::raw('DATE_FORMAT(showtimes.show_date, "%d-%m-%Y") as show_date'),
                DB::raw('CASE 
        WHEN bills.status = 0 THEN "Đang chờ thanh toán" 
        WHEN bills.status = 1 THEN "Đã thanh toán" 
        WHEN bills.status = 2 THEN "Thanh toán thất bại, lỗi" 
        END as payment_status'),
                DB::raw('CASE 
        WHEN bills.export_ticket = 0 THEN "Chờ xuất vé" 
        WHEN bills.export_ticket = 1 THEN "Đã xuất vé" 
        WHEN bills.export_ticket = 2 THEN "Quá hạn xuất vé" 
        END as export_ticket'),
                DB::raw('GROUP_CONCAT(DISTINCT seats.seat_code) as seat_code'),
                DB::raw('GROUP_CONCAT(DISTINCT IFNULL(CONCAT(ticket_foods.quantity, " - ", foods.food_name), " ")) as food_name')
            )
            ->groupBy(
                'bills.id',
                'bills.bill_code',
                'user_code',
                'user_name',
                'personnel_code',
                'personnel_name',
                'bills.total_ticket',
                'bills.total_combo',
                'bills.additional_fee',
                'bills.total_money',
                'movies.movie_name',
                'movies.image',
                'booking_date',
                'show_date',
                'payment_status',
                'export_ticket'
            )
            ->orderBy('bills.id', 'desc')
            ->get();
        return response()->json($bills);
    }


    //xuất vé file pdf  
    //lấy danh sách vé chưa xuất
    public function get_list_bill_export(Request $request)
    {
        $bill_code = $request->bill_code;
        // $user = User::where('user_code', $data['user_code'])->first();
        $bill = Bill::where('bill_code', $bill_code)->first();
        if (!$bill) {
            return response()->json(['error' => "Mã hóa đơn không tồn tại"], 404);
        } elseif ($bill->export_ticket == 1) {
            return response()->json(['error' => "Hóa đơn đã xuất vé rồi"]);
        } elseif ($bill->export_ticket == 2) {
            return response()->json(['error' => "Hóa đơn đã quá hạn xuất vé"]);
        } elseif ($bill->status == 0) {
            return response()->json(['error' => "Hóa đơn chưa được thanh toán"]);
        } elseif ($bill->status == 2) {
            return response()->json(['error' => "Hóa đơn thanh toán lỗi/ hủy"]);
        }
        $bills = Bill::leftjoin('users', 'users.user_code', '=', 'bills.user_code')
            ->leftjoin('personnels', 'personnels.personnel_code', '=', 'bills.personnel_code')
            ->join('tickets', 'tickets.bill_id', '=', 'bills.id')
            ->join('showtimes', 'showtimes.id', '=', 'tickets.showtime_id')
            ->join('movies', 'movies.id', '=', 'showtimes.movie_id')
            ->where('bills.bill_code', $bill_code)
            ->select(
                'bills.id',
                'bills.bill_code',
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
                'bills.bill_code',
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
            ->orderBy('bills.id', 'desc')
            ->get();

        return response()->json($bills);
    }

    public function get_bill_export(Request $request)
    {
        $bill_code = $request->bill_code;
        $bill = Bill::where('bill_code', $bill_code)->first();
        $bill_id = $bill->id;
        if (!$bill) {
            return response()->json(['error' => "Hóa đơn không tồn tại"]);
        }
        if ($bill->export_ticket == 0) {
            $tickets = Ticket::join('showtimes', 'showtimes.id', '=', 'tickets.showtime_id')
                ->join('movies', 'movies.id', '=', 'showtimes.movie_id')
                ->join('rooms', 'rooms.id', '=', 'showtimes.room_id')
                ->join('seats', 'seats.id', '=', 'tickets.id_seat')
                ->where('bill_id', $bill_id)
                ->select('movies.movie_name', 'showtimes.show_date as date', 'showtimes.show_time as time', 'rooms.name as room_name', 'seats.seat_code', 'tickets.price')
                ->groupBy('movie_name', 'date', 'time', 'room_name', 'seat_code', 'tickets.price')
                ->get();
            $ticket_foods = Ticket_Food::join('foods', 'foods.id', '=', 'ticket_foods.food_id')
                ->where('bill_id', $bill_id)
                ->select(
                    'foods.food_name',
                    'ticket_foods.quantity',
                    DB::raw('SUM(ticket_foods.total_money) as total_money')
                )
                ->groupBy('foods.food_name', 'ticket_foods.quantity')
                ->get();

            return response()->json(['tickets' => $tickets, 'ticket_foods' => $ticket_foods]);
        } else {
            return response()->json(['error' => "Vé đã được xuất rồi"]);
        }
    }

    public function export(Request $request)
    {
        $bill_code = $request->bill_code;
        $bill = Bill::where('bill_code', $bill_code)->first();
        $bill_id = $bill->id;
        if (!$bill) {
            return response()->json(['error' => "Hóa đơn không tồn tại"]);
        }
        if ($bill->export_ticket == 0) {
            $bills = Bill::where('id', $bill_id)->update(['export_ticket' => 1]);
            if ($request->personnel_code) {
                $bills = Bill::where('id', $bill_id)->update(['personnel_code' => $request->personnel_code]);
            }
            return response()->json(['message' => "Xuất vé thành công"]);
        } else {
            return response()->json(['error' => "Vé đã được xuất rồi"]);
        }
    }

    //chi tiết hóa đơn

    public function bill_detail(Request $request, $id)
    {
        $bill_detail = Bill::leftjoin('users', 'users.user_code', '=', 'bills.user_code')
            ->leftjoin('personnels', 'personnels.personnel_code', '=', 'bills.personnel_code')
            ->join('tickets', 'tickets.bill_id', '=', 'bills.id')
            ->join('showtimes', 'showtimes.id', '=', 'tickets.showtime_id')
            ->join('movies', 'movies.id', '=', 'showtimes.movie_id')
            ->join('rooms', 'rooms.id', '=', 'showtimes.room_id')
            ->where('bills.id', $id)
            ->select(
                'bills.id',
                'bills.bill_code',
                DB::raw('IFNULL(bills.user_code, "Không có") as user_code'),
                DB::raw('IFNULL(users.name, "Không có") as user_name'),
                DB::raw('IFNULL(bills.personnel_code, "Không có") as personnel_code'),
                DB::raw('IFNULL(personnels.name, "Không có") as personnel_name'),
                'bills.total_ticket',
                'bills.total_combo',
                'bills.additional_fee',
                'bills.total_money',
                'movies.movie_name',
                'movies.image',
                'rooms.name as room_name',
                DB::raw('DATE_FORMAT(bills.created_at, "%d-%m-%Y") as booking_date'),
                DB::raw('DATE_FORMAT(showtimes.show_date, "%d-%m-%Y") as show_date'),
                'showtimes.show_time',
                DB::raw('CASE 
                WHEN bills.status = 0 THEN "Đang chờ thanh toán" 
                WHEN bills.status = 1 THEN "Đã thanh toán" 
                WHEN bills.status = 2 THEN "Đã hủy" 
                END as payment_status')
            )
            ->groupBy(
                'bills.id',
                'bills.bill_code',
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
                'room_name',
                'booking_date',
                'show_date',
                'show_time',
                'payment_status'
            )
            ->orderBy('bills.id', 'desc')
            ->first();
        $tickets = Ticket::join('showtimes', 'showtimes.id', '=', 'tickets.showtime_id')
            ->join('movies', 'movies.id', '=', 'showtimes.movie_id')
            ->join('rooms', 'rooms.id', '=', 'showtimes.room_id')
            ->join('seats', 'seats.id', '=', 'tickets.id_seat')
            ->where('bill_id', $id)
            ->select('seats.seat_code', 'tickets.price')
            ->groupBy('seat_code', 'tickets.price')
            ->get();
        $ticket_foods = Ticket_Food::join('foods', 'foods.id', '=', 'ticket_foods.food_id')
            ->where('bill_id', $id)
            ->select(
                'foods.food_name',
                'ticket_foods.quantity',
                DB::raw('SUM(ticket_foods.total_money) as total_money')
            )
            ->groupBy('foods.food_name', 'ticket_foods.quantity')
            ->get();

        return response()->json([
            'bill' => [
                'id' => $bill_detail->id,
                'bill_code' => $bill_detail->bill_code,
                'user_code' => $bill_detail->user_code,
                'user_name' => $bill_detail->user_name,
                'personnel_code' => $bill_detail->personnel_code,
                'personnel_name' => $bill_detail->personnel_name,
                'total_ticket' => $bill_detail->total_ticket,
                'total_combo' => $bill_detail->total_combo,
                'additional_fee' => $bill_detail->additional_fee,
                'total_money' => $bill_detail->total_money,
                'movie_name' => $bill_detail->movie_name,
                'image' => $bill_detail->image,
                'room_name' => $bill_detail->room_name,
                'booking_date' => $bill_detail->booking_date,
                'show_date' => $bill_detail->show_date,
                'show_time' => $bill_detail->show_time,
                'payment_status' => $bill_detail->payment_status,
            ],
            'tickets' => $tickets,
            'ticket_foods' => $ticket_foods
        ]);
    }
}
