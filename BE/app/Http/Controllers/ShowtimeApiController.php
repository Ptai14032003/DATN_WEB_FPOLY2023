<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\MovieShowtimeResource;
use App\Http\Resources\ShowtimeResource;
use App\Models\Movie;
use App\Models\Showtime;
use Illuminate\Http\Request;

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

        $show_time = Showtime::create($request->all());
        return new ShowtimeResource($show_time);
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
            return response()->json(['messages' => 'Suất chiếu không tồn tại'], 404);
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
