<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieShowtimeResource;
use App\Http\Resources\ShowtimeResource;
use App\Models\Actor;
use App\Models\Bill;
use App\Models\Food;
use App\Models\Movie;
use App\Models\Movie_Genre;
use App\Models\Seat;
use App\Models\Showtime;
use App\Models\Promotion;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\PersonalAccessToken;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentDate = now(); // Get the current date and time

        $movies = Movie::join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
            ->select('movies.*', 'movie_types.type_name')
            ->whereNull('movies.deleted_at')
            ->where('movies.end_date', '>=', $currentDate) // Filter out movies with end_date smaller than the current date
            ->orderBy('movies.id', 'asc')
            ->get();

        return response()->json($movies);
    }
    public function comingSoon()
    {
        $currentDate = Carbon::now();

        $movies = Movie::join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
            ->select('movies.*', 'movie_types.type_name')
            ->whereNull('movies.deleted_at')
            ->where('movies.start_date', '>', $currentDate) // Filter movies with start_date greater than the current date
            ->orderBy('movies.id', 'asc')
            ->get();

        return response()->json($movies);
    }

    public function showing()
    {
        $currentDate = Carbon::now();

        $movies = Movie::join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
            ->select('movies.*', 'movie_types.type_name')
            ->whereNull('movies.deleted_at')
            ->where('movies.start_date', '<=', $currentDate)
            ->where('movies.end_date', '>=', $currentDate)
            ->orderBy('movies.id', 'asc')
            ->get();

        return response()->json($movies);
    }

    public function show_time_movie(string $id)
    {
        $movie = Movie::find($id);
        $currentTime = Carbon::now('Asia/Ho_Chi_Minh'); // Sử dụng múi giờ VN
        // Check if the movie is still in the "coming soon" phase
        if ($movie && $movie->start_date > Carbon::now()) {
            // return response()->json(['messages' => 'Phim này đang trong giai đoạn "Sắp chiếu"'], 404);
            return response()->json(['movie' => $movie, 'st_movie' => []]);
        }
        $st_movie = Movie::join('showtimes', 'showtimes.movie_id', '=', 'movies.id')
        ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
        ->join('movie_types', 'movie_types.id', '=', 'movies.movie_type_id')
        ->select(
            'showtimes.show_date',
            'showtimes.show_time',
            'rooms.name as room',
            'showtimes.id as showtime_id'
        )
        ->where('movies.id', $id)
        ->whereDate('showtimes.show_date', '>=', $currentTime->toDateString())
        // ->whereTime('showtimes.show_time', '>=', $currentTime->format('H:i'))
        ->orderby('showtimes.show_date','asc')
        ->orderby('showtimes.show_time', 'asc')
        ->get();

        $movies = Movie::join('movie_types', 'movie_types.id', '=', 'movies.movie_type_id')
            ->where('movies.id', $id)->select('movies.*', 'movie_types.type_name')->first();
        $movies->makeHidden(['movie_type_id']);
        foreach ($st_movie as $movie) {

            date_default_timezone_set('Asia/Ho_Chi_Minh');

            // Sử dụng Eloquent Collection để nhóm các suất chiếu theo ngày
            $groupedStMovie = $st_movie->groupBy('show_date');

            $result = [];
            foreach ($groupedStMovie as $date => $showtimes) {
                foreach ($showtimes as $index => $showtime) {
                    // Thêm thông tin ngày trong tuần và định dạng ngày, giờ
                    $weekday = date('l', strtotime($date));
                    $weekday = strtolower($weekday);
                    switch ($weekday) {
                        case 'monday':
                            $weekday = 'Thứ hai';
                            break;
                        case 'tuesday':
                            $weekday = 'Thứ ba';
                            break;
                        case 'wednesday':
                            $weekday = 'Thứ tư';
                            break;
                        case 'thursday':
                            $weekday = 'Thứ năm';
                            break;
                        case 'friday':
                            $weekday = 'Thứ sáu';
                            break;
                        case 'saturday':
                            $weekday = 'Thứ bảy';
                            break;
                        default:
                            $weekday = 'Chủ nhật';
                            break;
                    }

                    $showtime->weekday = $weekday;
                    $showtime->show_date = Carbon::parse($date)->format('d-m');
                    $showtime->show_time = Carbon::parse($showtime->show_time)->format('H:i');
                }
                // Ẩn trường show_date trong các suất chiếu
                $showtimes->makeHidden(['show_date', 'weekday']);
                // if (Carbon::now()->gt(Carbon::parse($showtime->show_date . ' ' . $showtime->show_time))) {
                //     continue;
                // }
                $result[] = [
                    'date' => Carbon::parse($date)->format('d-m'),
                    'weekday' => $weekday,
                    'showtimes' => $showtimes->toArray(),
                ];
            }

            if ($result) {
                return response()->json(['movie' => $movies, 'st_movie' => $result]);
            } else {
                return response()->json(['messages' => 'Không tồn tại suất chiếu theo phim này'], 404);
            }
        }
    }

    public function show_seat_room($id)
    {
        $seats = Seat::join('type_seats', 'type_seats.id', '=', 'seats.type_seat_id')
            ->join('rooms', 'rooms.id', '=', 'seats.room_id')
            ->join('showtimes', 'showtimes.room_id', '=', 'rooms.id')
            ->select(
                'seats.id',
                'seats.seat_code',
                'seats.type_seat_id',
                'type_seats.type_name',
                'rooms.name as room_name',
                DB::raw("(
            CASE
                WHEN NOT EXISTS (
                    SELECT 1
                    FROM tickets t
                    WHERE t.id_seat = seats.id AND t.showtime_id = $id
                ) THEN 2
                WHEN EXISTS (
                    SELECT 1
                    FROM tickets t
                    JOIN bills b ON b.id = t.bill_id
                    WHERE t.id_seat = seats.id AND b.status = 1 AND t.showtime_id = $id
                ) THEN 1
                WHEN EXISTS (
                    SELECT 1
                    FROM tickets t
                    JOIN bills b ON b.id = t.bill_id
                    WHERE t.id_seat = seats.id AND b.status = 0 AND t.showtime_id = $id
                ) THEN 0
                ELSE 2
            END
        ) as status")
            )
            ->where('showtimes.id', $id)
            ->groupBy('seats.id', 'seats.seat_code', 'seats.type_seat_id', 'type_seats.type_name', 'room_name')
            ->get();

        $movie = Movie::join('movie_types', 'movie_types.id', '=', 'movies.movie_type_id')
            ->join('showtimes', 'showtimes.movie_id', '=', 'movies.id')
            ->where('showtimes.id', $id)
            ->select('movies.id', 'movies.movie_name', 'movies.image', 'movies.trailer', 'movie_types.type_name as movie_type')
            ->first();
        $showtime = Showtime::join('movies', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->select('showtimes.*', 'movies.movie_name', 'rooms.name')
            ->where('showtimes.id', '=', $id)
            ->first();

        date_default_timezone_set('Asia/Ho_Chi_Minh');

        foreach ($seats as $seat) {
            // Nếu phim 2d thì vé thường 45k, 3d thì ghế thường 60k
            if ($movie->movie_type == '2D') {
                $seat->price = 45000; // Mặc định ghế thường là 45k - phòng 2D
            } else {
                $seat->price = 60000; // Mặc định ghế thường là 60k - phòng 3D
            }

            // Lấy ra ngày chiếu
            $show_date = Carbon::parse($showtime->show_date);

            // Nếu thứ 7 hoặc chủ nhật thì tăng giá vé lên 10k
            if ($show_date->isWeekend()) {
                $seat->price += 10000;
            }

            // Nếu ghế thường thì giữ nguyên, ghế vip thì tăng 5k/ vé, ghế đôi = 2 ghế vip
            if (strcasecmp($seat->type_name, 'VIP') == 0) {
                $seat->price += 5000;
            } elseif (strcasecmp($seat->type_name, 'Đôi') == 0) {
                $seat->price = ($seat->price + 5000) * 2;
            }

            // Kiểm tra giờ xuất chiếu và giảm giá nếu sau 22:00 (10h tối) theo múi giờ Việt Nam
            $show_time = Carbon::parse($showtime->show_time);
            $ten_pm = Carbon::createFromTime(22, 0, 0, 'Asia/Ho_Chi_Minh'); // 10 giờ tối

            if ($show_time->greaterThan($ten_pm)) {
                // Giảm giá 10%
                $seat->price -= $seat->price * 0.1;
            }
        }

        $combo = Food::all();
        return response()->json(['seats' => $seats, 'movie' => $movie, 'combo' => $combo, 'showtime' => $showtime->show_time]);
    }

    public function voucher(Request $request)
    {

        $token = $request->bearerToken();
        $entropy = PersonalAccessToken::findToken($token);
        $user = User::find($entropy->tokenable_id);
        $promotion_used = Bill::where("user_code", $user->user_code)->where('discount_code', '!=', null)->get();
        $promotions_use = [];
        foreach ($promotion_used as $promotion) {
            $promotions_use[] = $promotion->discount_code;
        }
        $currentDateTime = Carbon::now('Asia/Ho_Chi_Minh');
        $promotions = DB::table('promotions')
            ->whereNotIn('discount_code', $promotions_use)
            ->where('deleted_at', '=', null)
            ->where(function ($query) use ($currentDateTime) {
                $query->where('start', '<=', $currentDateTime)
                    ->where('end', '>=', $currentDateTime);
            })
            ->get();
        return response()->json($promotions);
    }

    public function booking_history(Request $request)
    {
        $booking_history = Bill::leftjoin('users', 'users.user_code', '=', 'bills.user_code')
            ->join('tickets', 'tickets.bill_id', '=', 'bills.id')
            ->join('seats', 'tickets.id_seat', '=', 'seats.id')
            ->join('showtimes', 'showtimes.id', '=', 'tickets.showtime_id')
            ->join('movies', 'movies.id', '=', 'showtimes.movie_id')
            ->join('rooms', 'rooms.id', '=', 'showtimes.room_id')
            ->leftJoin('ticket_foods', 'ticket_foods.bill_id', '=', 'bills.id')
            ->leftJoin('foods', 'foods.id', '=', 'ticket_foods.food_id')
            ->where('bills.user_code', $request->user_code)
            ->select(
                'bills.id',
                'bills.bill_code',
                'bills.user_code',
                'users.name as user_name',
                'bills.total_ticket',
                'bills.total_combo',
                'bills.additional_fee',
                'bills.total_money',
                'movies.movie_name',
                'showtimes.show_time',
                DB::raw('GROUP_CONCAT(DISTINCT seats.seat_code) as seat_code'),
                'movies.image',
                'rooms.name as room_name',
                DB::raw('DATE_FORMAT(bills.created_at, "%d-%m-%Y") as booking_date'),
                DB::raw('DATE_FORMAT(showtimes.show_date, "%d-%m-%Y") as show_date'),
                DB::raw('CASE 
                    WHEN bills.status = 0 THEN "Đang chờ thanh toán" 
                    WHEN bills.status = 1 THEN "Đã thanh toán" 
                    WHEN bills.status = 2 THEN "Đã hủy" 
                    END as payment_status'),
                DB::raw('GROUP_CONCAT(DISTINCT IFNULL(CONCAT(ticket_foods.quantity, "-", foods.food_name), "")) as food_name')
            )
            ->groupBy(
                'bills.id',
                'bills.bill_code',
                'bills.user_code',
                'users.name',
                'bills.total_ticket',
                'bills.total_combo',
                'bills.additional_fee',
                'bills.total_money',
                'movies.movie_name',
                'showtimes.show_time',
                'movies.image',
                'rooms.name',
                'booking_date',
                'show_date',
                'payment_status'
            )
            ->get();

        return response()->json($booking_history);
    }

    public function send_mail(Request $request)
    {
        $bill = Bill::where('bill_code', $request->bill_code)->first();
        //thông tin người nhận mail
        $user = User::where('user_code', $bill->user_code)->first();

        $movie = Bill::join('tickets', 'tickets.bill_id', '=', 'bills.id')
            ->join('showtimes', 'showtimes.id', '=', 'tickets.showtime_id')
            ->join('movies', 'movies.id', '=', 'showtimes.movie_id')
            ->join('seats', 'seats.id', '=', 'tickets.id_seat')
            ->join('rooms', 'rooms.id', '=', 'showtimes.room_id')
            ->leftJoin('ticket_foods', 'ticket_foods.bill_id', '=', 'bills.id')
            ->leftJoin('foods', 'foods.id', '=', 'ticket_foods.food_id')
            ->where('bills.bill_code', $request->bill_code)
            ->select(
                'bills.bill_code',
                'showtimes.show_date as show_date',
                'movies.movie_name as movie_name',
                'rooms.name as room_name',
                DB::raw('DATE_FORMAT(showtimes.show_time, "%H:%i") as show_time'), // Định dạng show_time chỉ theo giờ phút
                'movies.movie_time as movie_time',
                DB::raw('GROUP_CONCAT(DISTINCT seats.seat_code) as seat'),
                DB::raw('GROUP_CONCAT(DISTINCT IFNULL(CONCAT(ticket_foods.quantity, "-", foods.food_name), "")) as food')
            )
            ->groupBy('bills.bill_code','show_date', 'movie_name', 'room_name', 'show_time', 'movie_time')
            ->first();
        // send mail
        $to_name = "Wonder Cenima"; //tên người gửi
        $to_email = $user->email;

        $data = array(
            "bill_code"=>$movie->bill_code,
            "name" => $user->name,
            "movie_name" => $movie->movie_name,
            "show_date" => $movie->show_date,
            "show_time" => $movie->show_time,
            "movie_time" => $movie->movie_time,
            "seat" => $movie->seat,
            "food" => $movie->food,
            "to_name" => $to_name,
            "room_name" => $movie->room_name
        );

        Mail::send('send_mail', $data, function ($message) use ($to_name, $to_email) {
            $message->to($to_email)->subject("[Wonder Cenima] Xác nhận thanh toán thành công");

            $message->from($to_email, $to_name);
        });
        return response()->json("thành công");
    }
}
