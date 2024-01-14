<?php

namespace App\Http\Controllers;
use App\Models\Actor;
use App\Models\Movie;
use App\Models\Movie_Genre;
use App\Models\Movie_Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Cloudinary\Cloudinary;

class ApiMovieController extends Controller
{ 
   public function index(){
    $movies =  Movie::
        join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->select('movies.*', 'movie_types.type_name')
        ->whereNull('movies.deleted_at')
        ->orderBy('movies.id', 'desc')
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

public function showingAdmin(){
    $currentDate = Carbon::now();

    $movies = Movie::join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->select('movies.*', 'movie_types.type_name')
        ->whereNull('movies.deleted_at')
        ->where('movies.start_date', '<=', $currentDate)
        ->where('movies.end_date', '>=', $currentDate)
        ->orderBy('movies.id', 'asc')
        ->get();

    return response()->json($movies);
}
    public function store(Request $request){

        // if($request->image){
            // $result = cloudinary()->uploadApi()->upload($request->file);
        $fileData = $request->input('image')['fileList'][0]['thumbUrl'];
    
        $elements = explode(',', $fileData);

        // Lấy tất cả các phần tử sau dấu ','
        $elementsAfterComma = array_slice($elements, 1);
        // Giải mã dữ liệu base64
        $decodedData = base64_decode($elementsAfterComma[0]);

        // Tạo một tên tệp tin duy nhất
        $uniqueFileName = uniqid('file_');

        // Lưu dữ liệu vào tệp tin mới tạo
        $filePath = storage_path('app/' . $uniqueFileName);
        file_put_contents($filePath, $decodedData);
        $response = cloudinary()->upload($filePath)->getSecurePath();

            $type_name = $request->get('type_name');
            $movie_type = Movie_Type::where('type_name',$type_name)->first();

            $movie_name = $request->get('movie_name');
            $producer_name = $request->get('producer_name');
            $country_name = $request->get('country_name');
            $genre = $request->get('genre');
            $director = $request->get('director');
            $start_date = $request->get('start_date');
            $end_date = $request->get('end_date');
            $trailer = $request->get('trailer');
            $actor_name = $request->get('actor_name');
            $movie_time = $request->get('movie_time');
            $describe = $request->get('describe');
            $data = [
                'movie_name' => $movie_name,
                'country_name' => $country_name,
                'movie_type_id' => $movie_type->id,
                'genre' => $genre,
                'director' => $director,
                'actor_name' => $actor_name,
                'start_date' => '2024-01-10',    
                'end_date' => '2024-01-15',
                'movie_time'=> $movie_time,
                'image' => $response,
                'trailer' => $trailer,
                'describe' => ''
            ];
            Movie::create($data); 
            return response()->json($data);

        // }
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