<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\MovieShowtimeResource;
use App\Http\Resources\ShowtimeResource;
use App\Models\Movie;
use App\Models\Showtime;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ShowtimeApiController extends Controller
{
    public function index()
    {
        $show_time = Showtime::join('movies', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->select('showtimes.*', 'movies.movie_name', 'rooms.name')
            ->orderby('showtimes.id', 'desc')
            ->get();
        return ShowtimeResource::collection($show_time);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'show_date' => 'after:today',
            ],
            [
                'show_date.after' => "Ngày suất chiếu phải trước ngày hiện tại"
            ]
        );
        if ($validator->fails()) {
            return response()->json(['flag' => false, 'message' => 'Ngày suất chiếu phải trước ngày hiện tại']);
        }
        $existingShowtime = Showtime::join('movies', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->where('room_id', $request->input('room_id'))
            ->where('show_date', $request->input('show_date'))
            ->select('showtimes.show_time', 'movies.movie_time')
            ->get();
        $flag = true;
        // Khai báo một mảng để lưu trữ thông tin về từng suất chiếu và thời lượng phim
        $showtimesWithMovieTime = [];

        foreach ($existingShowtime as $showtime) {
            $showtimeTime = Carbon::parse($showtime->show_time);
            $userInputTime = Carbon::parse($request->input('show_time'));
            // Lấy thời lượng phim của suất chiếu hiện tại
            $movieTime = $showtime->movie_time;
            $movieHours = floor($movieTime / 60);
            $movieMinutes = $movieTime % 60;
            $userInputTimeWithMovieTime = $userInputTime->copy()->addHours($movieHours)->addMinutes($movieMinutes)->addMinutes(15);
            // Tính toán thời gian bắt đầu và kết thúc của suất chiếu
            $startTime = $showtimeTime->copy()->format("H:i"); // Giảm 15 phút
            $endTime = $showtimeTime->copy()->addHours($movieHours)->addMinutes($movieMinutes)->addMinutes(15)->format("H:i"); // Cộng thời lượng phim và 15 phút chờ đợi

            // Lưu thông tin vào mảng
            $showtimesWithMovieTime[] = [
                'show_time' => $showtime->show_time,
                'movie_time' => $showtime->movie_time,
                'start_time' => $startTime,
                'end_time' => $endTime,
                'tine' => $userInputTimeWithMovieTime->format("H:i")
            ];
            // $userInputTimeWithMovieTime = $userInputTimeWithMovieTime->format("H:i");
            $userInputTimeWithMovieTime = \DateTime::createFromFormat('H:i', $userInputTimeWithMovieTime->format("H:i"));
            $userInputTime = \DateTime::createFromFormat('H:i', $userInputTime->format("H:i"));

            if (($userInputTimeWithMovieTime >= \DateTime::createFromFormat('H:i', $startTime) && $userInputTimeWithMovieTime <= \DateTime::createFromFormat('H:i', $endTime)) || $userInputTime >= \DateTime::createFromFormat('H:i', $startTime) && $userInputTime <= \DateTime::createFromFormat('H:i', $endTime)) {
                return response()->json([
                             'flag' => false,
                             'message' => 'Thời gian suất chiếu bị trùng vào thời gian của suất chiếu khác hoặc đã tồn tại.',
                         ]);
            }
        }
        $show_time = Showtime::create($request->all());
            if ($show_time) {
                return response()->json(['flag' => true, 'message' => 'Thêm Suất chiếu thành công']);
            }
    }
    public function show(string $id)
    {
        $show_time = Showtime::join('movies', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->select('showtimes.*', 'movies.movie_name', 'rooms.name')
            ->find($id);
        if ($show_time) {
            return new ShowtimeResource($show_time);
        } else {
            return response()->json(['message' => 'Suất chiếu không tồn tại'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        $show_time = Showtime::find($id);
        if ($show_time) {
            $show_time->update($request->all());
            return response()->json(['messages' => 'Cập nhật xuất chiếu thành công'], 202);
        } else {
            return response()->json(['messages' => 'Suất chiếu không tồn tại'], 404);
        }
    }

    public function destroy(string $id)
    {
        $show_time = Showtime::join('movies', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->select('showtimes.*', 'movies.movie_name', 'rooms.name')
            ->find($id);
        if ($show_time) {
            $show_time->delete();
            return response()->json(['messages' => 'Xóa xuất chiếu thành công'], 202);
        } else {
            return response()->json(['messages' => 'Suất chiếu không tồn tại'], 404);
        }
    }

    public function show_time_movie(string $id)
    {
        $st_movie = Movie::join('showtimes', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->select('movies.id', 'movies.movie_name', 'showtimes.show_date', 'showtimes.show_time', 'rooms.name')
            ->find($id);
        if ($st_movie) {
            return new MovieShowtimeResource($st_movie);
        } else {
            return response()->json(['messages' => 'Không tồn tại suất chiếu theo phim này'], 404);
        }
    }
}
