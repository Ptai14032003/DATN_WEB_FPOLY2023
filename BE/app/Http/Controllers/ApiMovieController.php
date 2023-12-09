<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
use App\Models\Actor;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Cloudinary\Cloudinary;

class ApiMovieController extends Controller
{
    
    public function index(){
        $movie =  Movie::
        join('countries', 'movies.country_id', '=', 'countries.id')
        ->join('producers', 'movies.producer_id', '=', 'producers.id')
        ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->join('movie_genres', 'movie_genres.movie_id', '=', 'movies.id')
        ->join('list_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id')
        ->select('movies.*', 'countries.country_name','producers.producer_name', 'movie_types.type_name', 'list_genres.genre')
        ->whereNull('movies.deleted_at')
        ->get();
     return response()->json($movie);
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

    public function show(string $id)
    {
        $movie = Movie::find($id);
        return response()->json($movie);
    }

    public function edit(string $id){
        $movie = Movie::join('countries', 'movies.country_id', '=', 'countries.id')
        ->join('producers', 'movies.producer_id', '=', 'producers.id')
        ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->join('movie_genres', 'movie_genres.movie_id', '=', 'movies.id')
        ->join('list_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id')
        ->select('movies.*', 'countries.country_name','producers.producer_name', 'movie_types.type_name', 'list_genres.genre')
        // ->whereNull('movies.deleted_at')
        ->get();

        if ($movie) {
            // Render the edit form with the movie data
            return view('movies.edit', ['movie' => $movie]);
        } else {
            return response()->json(['message' => 'Không tồn tại'], 404);
        }
    }

    public function update(Request $request, $id){
        $movie = Movie::findOrFail($id);

        $movie_name = $request->get('movie_name');
        $producer_id = $request->get('producer_id');
        $country_id = $request->get('country_id');
        $movie_type_id = $request->get('movie_type_id');
        $director = $request->get('director');
        $actor_name = $request->get('actor_name');
        $genre = $request->get('genre');
        $start_date = $request->get('start_date');
        $end_date = $request->get('end_date');
        $total_revenue = $request->get('total_revenue');
        $trailer = $request->get('trailer');
        $gender = $request->get('gender');
        $role = $request->get('role');
        $movie_role = $request->get('movie_role');

        if ($request->hasFile('image')) {
            // Upload the new image to Cloudinary
            $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $image = $response;
        } else {
            // Use the existing image path
            $image = $movie->image;
        }

        $data = [
            'movie_name' => $movie_name,
            'producer_id' => $producer_id,
            'country_id' => $country_id,
            'movie_type_id' => $movie_type_id,
            'director' => $director,
            'genre'=>$genre,
            'actor_name' => $actor_name,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'total_revenue' => $total_revenue,
            'image' => $image,
            'trailer' => $trailer
        ];

        $movie->update($data);

        return response()->json($movie);
    }

    public function destroy(string $id){
        $movie = Movie::find($id);

        $movie->delete();
        return response()->json([
            'message'=> 'delete successfully'
        ]);
    }    
}
