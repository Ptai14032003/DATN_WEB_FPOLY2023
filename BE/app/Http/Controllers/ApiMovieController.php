<?php

namespace App\Http\Controllers;


use App\Models\Actor;
use App\Models\Movie;
use App\Models\Movie_Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Cloudinary\Cloudinary;

class ApiMovieController extends Controller
{
    
   public function index()
{
    $movies =  Movie::join('countries', 'movies.country_id', '=', 'countries.id')
        ->join('producers', 'movies.producer_id', '=', 'producers.id')
        ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->select('movies.*', 'countries.country_name', 'producers.producer_name', 'movie_types.type_name')
        ->whereNull('movies.deleted_at')
        ->orderBy('movies.id', 'asc')
        ->get();

    foreach ($movies as $movie) {
        $id = $movie->id;

        $genres = DB::table('list_genres')
            ->join('movie_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id') 
            ->join('movies', 'movies.id', '=', 'movie_genres.movie_id')
            ->where('movie_genres.movie_id', $id)
            ->select('genre')
            ->get();

        $movie->genre = $genres->pluck('genre')->toArray();

        $actors = DB::table('actors')
            ->join('movies', 'actors.movie_id', '=', 'movies.id')
            ->where('actors.movie_id', $id)
            ->select('actor_name')
            ->get();

        $movie->actor_name = $actors->pluck('actor_name')->toArray();

        $movie->makeHidden(['country_id', 'producer_id', 'movie_type_id']);
    }

    return response()->json($movies);
}

    public function store(Request $request){
        
        if($request->hasFile('image')){
            $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $image = $response;
           
            $movie_name = $request->get('movie_name');
            $producer_id = $request->get('producer_id');
            $country_id = $request->get('country_id');
            $movie_type_id = $request->get('movie_type_id');
            $director = $request->get('director');
            $start_date = $request->get('start_date');
            $end_date = $request->get('end_date');
            $total_revenue = $request->get('total_revenue');
            $trailer = $request->get('trailer');
            $gender = $request->get('gender');
            $actor_name = $request->get('actor_name');
            $role = $request->get('role');
            $movie_role = $request->get('movie_role');
            $movie_time = $request->get('movie_time');
            $movie_status = $request->get('movie_status');
            $data = [
                'movie_name' => $movie_name,
                'producer_id' => $producer_id,
                'country_id' => $country_id,
                'movie_type_id' => $movie_type_id,
                'director' => $director,
                'actor_name' => $actor_name,
                'start_date' => $start_date,    
                'end_date' => $end_date,
                'total_revenue'=> $total_revenue,
                'movie_time'=> $movie_time,
                'movie_status' => $movie_status,
                'image' => $image,
                'trailer' => $trailer
            ];

            Movie::create($data); 
            $movie = DB::select(' SELECT * FROM movies WHERE movie_name = :movie_name ', ['movie_name' => $movie_name ]);
            foreach($movie as $movi) {
                $id = $movi->id;
                $newdata = [
                    'actor_name' => $actor_name,
                    'gender' => $gender,
                    'movie_id' => $id,
                    'role' => $role,
                    'movie_role' => $movie_role,
                ];
                Actor::create($newdata);
                }

        }else{
            return $this->returnError(202, 'file is required');
        }
    }

    public function edit(string $id)
    {
        $movie = Movie::join('countries', 'movies.country_id', '=', 'countries.id')
            ->join('producers', 'movies.producer_id', '=', 'producers.id')
            ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
            ->select('movies.*', 'countries.country_name', 'producers.producer_name', 'movie_types.type_name')
            ->where('movies.id', $id)
            ->whereNull('movies.deleted_at')
            ->first();
    
            if ($movie) {
                $genres = DB::table('list_genres')
                    ->join('movie_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id')
                    ->where('movie_genres.movie_id', $id)
                    ->pluck('genre')
                    ->toArray();
                $movie->genres = $genres;    
    
            $actors = DB::table('actors')
                ->where('actors.movie_id', $id)
                ->pluck('actor_name')
                ->toArray();
    
            $movie->actors = $actors; // Change 'actor_name' to 'actors' to store as an array
            $movie->makeHidden(['country_id', 'producer_id', 'movie_type_id']);
            // Render the edit form with the movie data
            return response()->json($movie);
        } else {
            return response()->json(['message' => 'Không tồn tại'], 404);
        }
    }
    
    public function update(Request $request, string $id) {
        $movie = Movie::find($id);
    
        if (!$movie) {
            return response()->json(['messages' => 'Phim không tồn tại'], 404);
        }
    
        // Update the movie data
        $movie->update($request->all());
    
        // Update related data
        $movie->countries->update(['country_name' => $request->input('country_name')]);
        $movie->producers->update(['producer_name' => $request->input('producer_name')]);
        $movie->movieType->update(['type_name' => $request->input('type_name')]);
    
    // Update genres
        $gen = DB::table('movie_genres')      
        ->where('movie_genres.movie_id', $id)
        ->delete();

        $newGenre = $request->input('genres');
     
        foreach ($newGenre as $new){
            $genreID = DB::table('list_genres')->where('genre' , $new)->first();
            Movie_Genre::create(['movie_id' => $id, 'list_genre_id' => $genreID->id]);
        }
          
    // Update actors
        $newActor = $request->input('actors');
        DB::table('actors')->where('movie_id', $id)->update(['actor_name' => $newActor]);
     
        // if ($request->hasFile('image')) {
        //     // Upload the new image to Cloudinary
        //     $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
        //     $data['image'] = $response;    
        // } else {
        //     $data['image'] = $movie->image;
        // }
        // $movie->update($data);
    
    return response()->json(['messages' => 'Cập nhật phim thành công'], 202);
    }
    
    public function destroy(string $id){
        $movie = Movie::find($id);

        $movie->delete();
        return response()->json([
            'message'=> 'delete successfully'
        ]);
    }    
}
