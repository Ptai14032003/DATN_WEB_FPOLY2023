<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Seat;
use App\Models\Showtime;
use App\Models\Ticket;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    // trang admin
    //vé xem phim
    public function index()
    {
        $ticket = Ticket::all();
    }

    // đặt vé người dùng

    public function book_ticket(Request $request)
    {
        $showtime_id = $request->showtime_id;
        // thông tin xuất chiếu
        $showtime = Showtime::join('movies', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->select('showtimes.*', 'movies.movie_name', 'rooms.name')
            ->where('showtimes.id', $showtime_id)
            ->first();
        // thông tin phim
        $movie = Movie::join('movie_types', 'movie_types.id', '=', 'movies.movie_type_id')
            ->join('showtimes', 'showtimes.movie_id', '=', 'movies.id')
            ->where('showtimes.id', $showtime_id)
            ->select('movies.*', 'movie_types.type_name')
            ->first();
        // thông tin loại ghế
        $id_seat = $request->id_seat;

        $price_ticket_film = [];
        for ($i = 0; $i < count($id_seat); $i++) {
            // thông tin loại ghế
            $type_seat = Seat::join('type_seats', 'type_seats.id', '=', 'seats.type_seat_id')
                ->select('type_seats.type_name')
                ->where('type_seats.id', '=', $id_seat[$i])
                ->first();
            //nếu phim 2d thì vé thường 45k 3d thì ghế thường 60k
            if ($movie->type_name == '2D') {
                $price_ticket_film[$i] = 45000; //mặc định ghế thường là 45k - phòng 2D
            } else {
                $price_ticket_film[$i] = 60000; //mặc định ghế thường là 45k - phòng 2D
            }
            $show_date = new DateTime($showtime->show_date); //lấy ra ngày chiếu
            if ($show_date->format('N') == '7' || $show_date->format('N') == '6') { //nếu thứ 7 hoặc chủ nhật thì tăng giá vé lên 10k
                $price_ticket_film[$i] += 10000;
            }
            // nếu ghế thường thì giữ nguyên ghế vip thì tăng 5k/ vé ghế đôi =2 ghế vip
            if (strcasecmp($type_seat->type_name, 'VIP') == 0) {
                $price_ticket_film[$i] += 5000;
            } elseif (strcasecmp($type_seat->type_name, 'Đôi') == 0) {
                $price_ticket_film[$i] = ($price_ticket_film[$i] + 5000) * 2;
            }
        }
        return response()->json($price_ticket_film, 200);
    }
}
