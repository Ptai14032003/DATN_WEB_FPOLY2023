<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieShowtimeResource;
use App\Models\Actor;
use App\Models\Movie;
use App\Models\Movie_Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            ->get();
        return response()->json($movie);
    }

    public function show_time_movie(string $id)
    {
        $st_movie = Movie::join('showtimes', 'showtimes.movie_id', '=', 'movies.id')
            ->join('rooms', 'showtimes.room_id', '=', 'rooms.id')
            ->select('movies.id', 'movies.movie_name', 'showtimes.show_date', 'showtimes.show_time', 'rooms.name')
            ->find($id);

        if ($st_movie) {
            $actor = Actor::join('movies', 'actors.movie_id', '=', 'movies.id')->get();
            $movieGenre = Movie_Genre::join('movies', 'movie_genres.movie_id', '=', 'movies.id')
                ->join('list_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id')
                ->get();
            return new MovieShowtimeResource(['movie' => $st_movie, 'actor' => $actor, 'movieGenre' => $movieGenre]);
        } else {
            return response()->json(['messages' => 'Không tồn tại suất chiếu theo phim này'], 404);
        }
    }
}
