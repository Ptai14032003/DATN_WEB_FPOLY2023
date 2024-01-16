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
                'show_time' => [
                    Rule::unique('showtimes')->where(function ($query) use ($request) {
                        return $query->where([
                            'room_id' => $request->input('room_id'),
                            'show_date' => $request->input('show_date'),
                        ]);
                    }),
                ],
            ],
            [
                'show_date.after' => "Ngày suất chiếu phải trước ngày hiện tại",
                'show_time.unique' => 'Suất chiếu đã tồn tại cho thời gian và ngày đã chọn'
            ]
        );
        if ($validator->fails()) {
            return response()->json(['flag' => false, 'message' => "Ngày suất chiếu phải trước ngày hiện tại"]);
        }
        $flag = false;
        $existingShowtime = Showtime::join('movies', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->where('room_id', $request->input('room_id'))
            ->where('show_date', $request->input('show_date'))
            ->select('showtimes.show_time','movies.movie_time')
            ->get();
        //return response()->json($existingShowtime);
        $userInputTime = Carbon::parse($request->input('show_time'));
        $flag = false;
        foreach ($existingShowtime as $showtime) {
            $showtimeTime = Carbon::parse($showtime->show_time);
            $movieTime = $existingShowtime->first()->movie_time;
            $movieHours = floor($movieTime / 60);
            $movieMinutes = $movieTime % 60;
            // return response()->json($movieTime);
            // Kiểm tra xem thời gian nhập có trùng với bất kỳ show_time nào không
            if ($userInputTime->greaterThanOrEqualTo($showtimeTime) && $userInputTime->lessThanOrEqualTo($showtimeTime->copy()->addHours($movieHours)->addMinutes($movieMinutes)->addMinutes(15))) {
                $flag = true;
                break; // Nếu đã tìm thấy trùng lặp, có thể dừng vòng lặp
            }elseif(($userInputTime->greaterThanOrEqualTo($showtimeTime->copy()->subHours($movieHours)->subMinutes($movieMinutes)->subMinutes(15)))&&($userInputTime->lessThanOrEqualTo($showtimeTime))
            ){
                $flag = true;
                break;
            }
        }
        if ($flag) {
            return response()->json(['flag' => false, 'message' => 'Thời gian suất chiếu bị trùng vào thời gian của suất chiếu khác hoặc đã tồn tại.']);
        } else {
            // Thêm suất chiếu mới nếu không có trùng lặp
            $show_time = Showtime::create($request->all());
            if ($show_time) {
                return response()->json(['flag' => true, 'message' => 'Thêm Suất chiếu thành công']);
            }
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