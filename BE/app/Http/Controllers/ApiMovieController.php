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
   public function index(){
    $movies =  Movie::
        join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->select('movies.*', 'movie_types.type_name')
        ->whereNull('movies.deleted_at')
        ->orderBy('movies.id', 'asc')
        ->get();

    // // foreach ($movies as $movie) {
    // //     $id = $movie->id;
    // //     $genres = DB::table('list_genres')
    // //         ->join('movie_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id') 
    // //         ->join('movies', 'movies.id', '=', 'movie_genres.movie_id')
    // //         ->where('movie_genres.movie_id', $id)
    // //         ->select('genre')
    // //         ->get();

    // //     $movie->genre = $genres->pluck('genre')->toArray();
    //     
    // }
    $movies->makeHidden([ 'movie_type_id']);
    return response()->json($movies);
}

    public function store(Request $request){
        if($request->hasFile('image')){
            $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $image = $response;
            $movie_name = $request->get('movie_name');
            $producer_name = $request->get('producer_name');
            $country_name = $request->get('country_name');
            $movie_type_id = $request->get('movie_type_id');
            $genre = $request->get('genre');
            $director = $request->get('director');
            $start_date = $request->get('start_date');
            $end_date = $request->get('end_date');
            $total_revenue = $request->get('total_revenue');
            $trailer = $request->get('trailer');
            $actor_name = $request->get('actor_name');
            $movie_time = $request->get('movie_time');
            $describe = $request->get('describe');
            $data = [
                'movie_name' => $movie_name,
                'country_name' => $country_name,
                'movie_type_id' => $movie_type_id,
                'genre' => $genre,
                'director' => $director,
                'actor_name' => $actor_name,
                'start_date' => $start_date,    
                'end_date' => $end_date,
                'total_revenue'=> $total_revenue,
                'movie_time'=> $movie_time,
                'image' => $image,
                'trailer' => $trailer,
                'describe' => $describe
            ];
            Movie::create($data); 
            return response()->json(['messages' => 'Them phim thành công'], 200);
        }
        // }else{
        //     return $this->returnError(202, 'file is required');
        // }
       
    }

    public function edit(string $id)
    {
     
        $movie = Movie::
            join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
            ->select('movies.*', 'movie_types.type_name')
            ->where('movies.id', $id)
            ->whereNull('movies.deleted_at')
            ->first();
    
            //  
            //     $genres = DB::table('list_genres')
            //         ->join('movie_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id')
            //         ->where('movie_genres.movie_id', $id)
            //         ->pluck('genre')
            //         ->toArray();
            //     $movie->genres = $genres;    
            if ($movie){
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
    
        // // Update genres
        // $gen = DB::table('movie_genres')      
        // ->where('movie_genres.movie_id', $id)
        // ->delete();

        // $newGenre = $request->input('genres');
     
        // foreach ($newGenre as $new){
        //     $genreID = DB::table('list_genres')->where('genre' , $new)->first();
        //     Movie_Genre::create(['movie_id' => $id, 'list_genre_id' => $genreID->id]);
        // }
  
     
        if ($request->hasFile('image')) {
            // Upload the new image to Cloudinary
            $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $data['image'] = $response;
    
            // Delete old image from Cloudinary
            $oldImage = $movie->image;
            if ($oldImage) {
                $publicId = cloudinary()->getPublicIdFromPath($oldImage);
                cloudinary()->destroy($publicId);
            }
        } else {
            // If no new image is provided, keep the existing image
            $data['image'] = $movie->image;
        }
        // Update the movie record with the new data
        $movie->update($data);
    
    return response()->json(['messages' => 'Cập nhật phim thành công'], 202);
    }
    
    public function destroy(string $id){
        $movie = Movie::find($id);

        $movie->delete();
        return response()->json([
            'message'=> 'Xóa Phim Thành Công'
        ]);
    }    

    public function destroyMultipleMovie(Request $request){
        // Lấy danh sách id của các phim cần xóa
        $ids = $request->input('ids');
        // Xóa các phim có id trong danh sách
        Movie::whereIn('id', $ids)->delete();
        // Trả về kết quả thành công
        return response()->json(['success' => 'Xóa nhiều phim thành công']);
    }
}