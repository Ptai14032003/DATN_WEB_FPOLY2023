<?php

namespace App\Http\Controllers;


use App\Models\Movie_Genre;
use Illuminate\Http\Request;

class ApiMovieGenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh danh sách
        $movieGenre = Movie_Genre::
        join('movies', 'movie_genres.movie_id', '=', 'movies.id')
        ->join('list_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id')
        ->select('movie_genres.*')
        ->get();
        return response()->json($movieGenre);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $movieGenre = Movie_Genre::create($request->all());
        // Lưu trữ các thể loại đã chọn
        // $genres = $request->input('genres');
    
        // // Thêm từng thể loại vào bảng movie_genre
        // foreach ($genres as $genre) {
        //     Movie_Genre::create([
        //         'movie_id' => $movieGenre->id,
        //         'genre_id' => $genre,
        //     ]);
        // }
//        trả về thông vừa thêm
return response()->json($movieGenre);
    }

    /**
     * Display the specified resource.
     */
//    Hiển thị sửa
    public function show(string $id)
    {
        //
        $movieGenre = Movie_Genre:: 
        join('movies', 'movie_genres.movie_id', '=', 'movies.id')
        ->join('list_genres', 'movie_genres.list_genre_id', '=', 'list_genres.id')
        ->find($id);
        if($movieGenre){
            return  response()->json($movieGenre);
        }else{
            return  response()->json(['message'=>'Không tồn tại'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $movieGenre = Movie_Genre::find($id);
        if($movieGenre){
            $movieGenre->update($request->all());
        }else{
            return  response()->json(['message'=>'Không tồn tại'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $movieGenre = Movie_Genre::find($id);
        if($movieGenre){
            $movieGenre->delete();
            return  response()->json(['message'=>'Xóa thành công'], 280);
        }else{
            return  response()->json(['message'=>'Không tồn tại'], 404);
        }
    }
}
