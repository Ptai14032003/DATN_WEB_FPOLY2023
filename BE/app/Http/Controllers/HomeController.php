<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieShowtimeResource;
use App\Http\Resources\ShowtimeResource;
use App\Models\Actor;
use App\Models\Food;
use App\Models\Movie;
use App\Models\Movie_Genre;
use App\Models\Seat;
use App\Models\Showtime;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $movie =  Movie::join('countries', 'movies.country_id', '=', 'countries.id')
            ->join('producers', 'movies.producer_id', '=', 'producers.id')
            ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
            ->select('movies.*', 'countries.country_name', 'producers.producer_name', 'movie_types.type_name')
            ->whereNull('movies.deleted_at')
            ->OrderBy('movies.id', 'asc')
            ->get();
        return response()->json($movie);
    }


    public function show_time_movie(string $id)
    {
        $st_movie = Movie::join('showtimes', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->join('producers', 'producers.id', '=', 'movies.producer_id')
            ->join('countries', 'countries.id', '=', 'movies.country_id')
            ->join('movie_types', 'movie_types.id', '=', 'movies.movie_type_id')
            ->select(
                'showtimes.show_date',
                'showtimes.show_time',
                'rooms.name as room',
                'showtimes.id as showtime_id'
            )
            ->where('movies.id', $id)
            ->get();
        $movies = Movie::where('movies.id', $id)->select('movies.*')->first();

        date_default_timezone_set('Asia/Ho_Chi_Minh');
        foreach ($st_movie as $movie) {

            //tính ra ngày trong tuần

            $weekday = date('l', strtotime($movie->show_date));

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
            $movie->weekday = $weekday;
            $movie->show_date = Carbon::parse($movie->show_date)->format('d-m');
            $movie->show_time = Carbon::parse($movie->show_time)->format('h:i');
        }
        $st_movie = $st_movie->toArray();
        if ($st_movie) {
            $actor = Actor::join('movies', 'actors.movie_id', '=', 'movies.id')
                ->where('movie_id', $id)
                ->select('actors.actor_name')
                ->get();
            $movieGenre = Movie_Genre::join('movies', 'movie_genres.movie_id', '=', 'movies.id')
                ->join('list_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id')
                ->where('movie_id', $id)
                ->select('list_genres.genre')
                ->get();
            return response()->json(['movie' => $movies, 'st_movie' => $st_movie, 'actor' => $actor, 'movie_genres' => $movieGenre]);
        } else {
            return response()->json(['messages' => 'Không tồn tại suất chiếu theo phim này'], 404);
        }
        // return response()->json([$st_movie]);

    }

    public function show_seat_room($id)
    {
        $seats = Seat::join('type_seats', 'type_seats.id', '=', 'seats.type_seat_id')
            ->join('rooms', 'rooms.id', '=', 'seats.room_id')
            ->join('showtimes', 'showtimes.room_id', '=', 'rooms.id')
            ->leftJoin('tickets', function ($join) {
                $join->on('tickets.showtime_id', '=', 'showtimes.id')
                    ->whereRaw('tickets.id_seat = seats.id');
            })
            ->leftJoin('bills', 'bills.id', '=', 'tickets.bill_id')
            ->where('showtimes.id', $id)
            ->select(
                'seats.id',
                'seats.seat_code',
                'seats.type_seat_id',
                'type_seats.type_name',
                'rooms.name as room_name',
                \DB::raw("(
                CASE
                    WHEN tickets.id IS NULL THEN 2
                    WHEN bills.status IN (0, 1) THEN bills.status
                    WHEN bills.status = 2 THEN 2
                    ELSE 2
                END
            ) as status")
            )
            ->groupBy('seats.id', 'seats.seat_code', 'seats.type_seat_id', 'type_seats.type_name', 'room_name', 'tickets.id', 'bills.status')
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
            //nếu phim 2d thì vé thường 45k 3d thì ghế thường 60k
            if ($movie->movie_type == '2D') {
                $seat->price = 45000; //mặc định ghế thường là 45k - phòng 2D
            } else {
                $seat->price = 60000; //mặc định ghế thường là 60k - phòng 3D
            }
            $show_date = new DateTime($showtime->show_date); //lấy ra ngày chiếu
            if ($show_date->format('N') == '7' || $show_date->format('N') == '6') { //nếu thứ 7 hoặc chủ nhật thì tăng giá vé lên 10k
                $seat->price += 10000;
            }
            // nếu ghế thường thì giữ nguyên ghế vip thì tăng 5k/ vé ghế đôi =2 ghế vip
            if (strcasecmp($seat->type_name, 'VIP') == 0) {
                $seat->price += 5000;
            } elseif (strcasecmp($seat->type_name, 'Đôi') == 0) {
                $seat->price = ($seat->price + 5000) * 2;
            }
        }
        $combo = Food::all();
        return response()->json(['seats' => $seats, 'movie' => $movie, 'combo' => $combo]);
    }
}
