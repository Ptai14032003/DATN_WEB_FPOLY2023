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
        $existingShowtime = Showtime::where('room_id', $request->input('room_id'))
        ->where('show_date', $request->input('show_date'))
        ->orderBy('show_time', 'desc') // Chọn suất chiếu mới nhất
        ->first();
        if ($validator->fails()) {
            return response()->json($validator->messages());
        } 
        elseif ($existingShowtime) {
            // Kiểm tra xem $resultTime có dữ liệu hay không
            $resultTime = Showtime::join('movies', 'showtimes.movie_id', '=', 'movies.id')
                ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
                ->where('show_date', '=', $request->input('show_date'))
                ->where('room_id', '=', $request->input('room_id'))
                ->select('movies.movie_time')
                ->get();
    
            if ($resultTime->isNotEmpty()) {
                $existingShowtimeTime = Carbon::parse($existingShowtime->show_time);
    
                // Lấy thời lượng phim từ cơ sở dữ liệu (đây là giả sử movie_time là số phút)
                $movieTime = $resultTime->first()->movie_time; // Điều chỉnh để lấy đúng giá trị từ cơ sở dữ liệu
    
                // Cộng thêm thời lượng phim và 15 phút
                $newShowtimeTime = $existingShowtimeTime->copy()->addMinutes($movieTime + 15);
    
                // Thời gian của suất chiếu mới
                $newShowtime = Carbon::parse($request->input('show_time'));
    
                // Kiểm tra xem thời gian của suất chiếu mới có sau thời gian đã tính ở bước 3 không
                if ($newShowtime->lessThanOrEqualTo($newShowtimeTime)) {
                    // Suất chiếu mới không hợp lệ
                    // Gọi Validator để thêm thông báo lỗi
                    $validator->errors()->add('show_time', 'Thời gian suất chiếu phải sau thời gian của suất chiếu cuối cùng cộng thêm 15 phút.');
                    return response()->json($validator->messages());
                } else {
                $show_time = Showtime::create($request->all());
                if ($show_time) {
                    return response()->json(['message' => 'Thêm Suất chiếu thành công']);
                }
            } 
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
