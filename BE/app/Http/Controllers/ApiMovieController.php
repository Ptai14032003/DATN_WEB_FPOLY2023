<?php

namespace App\Http\Controllers;


use App\Models\Actor;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Cloudinary\Cloudinary;

class ApiMovieController extends Controller
{
    
    public function index()
    {

        $movie =  Movie::join('countries', 'movies.country_id', '=', 'countries.id')
            ->join('producers', 'movies.producer_id', '=', 'producers.id')
            ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
           
            ->select('movies.*', 'countries.country_name', 'producers.producer_name', 'movie_types.type_name')
            ->whereNull('movies.deleted_at')
            ->OrderBy('movies.id', 'asc')
            ->get();
            foreach ($movie as $mv){
               $id = $mv->id;
               $mv->genre = '';
               $genres = DB::table('list_genres')
               ->join('movie_genres', 'movie_genres.list_genre_id', '=' ,'list_genres.id') 
               ->join('movies','movies.id','=', 'movie_genres.movie_id')
               ->where('movie_genres.movie_id', $id)
               ->select('genre')
               ->get();
             
               foreach($genres as $name){
                $mv->genre = $mv->genre.''.(string)$name->genre.', ';
               }
               $mv->genre = substr($mv->genre, 0, -1);
              
            }

            foreach ($movie as $mv){
                $id = $mv->id;
                $mv->actor_name = '';
                $actors = DB::table('actors')
                ->join('movies', 'actors.movie_id' ,'=','movies.id')
                ->where('actors.movie_id', $id)
                ->select('actor_name')
                ->get();
              
                foreach($actors as $actor){
                 $mv->actor_name = $mv->actor_name.''.(string)$actor->actor_name.', ';
                }
                $mv->actor_name = substr($mv->actor_name, 0, -1);
                $mv->makeHidden(['country_id', 'producer_id', 'movie_type_id']);
               
             }
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
                    ->select('list_genres.id as genre_id', 'list_genres.genre')
                    ->get();
                $movie->genres = $genres;
            
    
            $actors = DB::table('actors')
                ->where('actors.movie_id', $id)
                ->pluck('actor_name')
                ->toArray();
    
            $movie->actors = $actors; // Change 'actor_name' to 'actors' to store as an array
    
            // Render the edit form with the movie data
            return response()->json($movie);
        } else {
            return response()->json(['message' => 'Không tồn tại'], 404);
        }
    }
    
    // public function update(Request $request, $id){
    //     $movie = Movie::findOrFail($id);
    
    //     // Validate the request data if needed
    
    //     $data = [
    //         'movie_name' => $request->get('movie_name'),
    //         'producer_id' => $request->get('producer_id'),
    //         'country_id' => $request->get('country_id'),
    //         'movie_type_id' => $request->get('movie_type_id'),
    //         'director' => $request->get('director'),
    //         'genre' => $request->get('genre'),
    //         'actor_name' => $request->get('actor_name'),
    //         'start_date' => $request->get('start_date'),
    //         'end_date' => $request->get('end_date'),
    //         'total_revenue' => $request->get('total_revenue'),
    //         'trailer' => $request->get('trailer'),
    //     ];
    
    //     // Check if a new image is provided
    //     if ($request->hasFile('image')) {
    //         // Upload the new image to Cloudinary
    //         $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
    //         $data['image'] = $response;
            
    //     } else {
    //         // If no new image is provided, keep the existing image path
    //         $data['image'] = $movie->image;
    //     }
    
    //     $movie->update($data);
    
    //     return response()->json($movie);
    // }

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
    $newGenre = $request->input('genre');
    if ($newGenre !== null) {
        $genreIds = DB::table('list_genres')
            ->join('movie_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id')
            ->where('movie_genres.movie_id', $id)
            ->pluck('list_genres.id');

        foreach ($genreIds as $genreId) {
            List_Genre::find($genreId)->update(['genre' => $newGenre]);
        }
    }
    // Update actors
    // $newActor = $request->input('actor_name');
    // if ($newActor !== null) {
    //     $actors = DB::table('actors')
    //         ->where('movie_id', $id)
    //         ->select('id')
    //         ->get();

    //     foreach ($actors as $actor) {
    //         DB::table('actors')->where('id', $actor->id)->update(['actor_name' => $newActor]);
    //     }
    // }
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
