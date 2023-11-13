<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class ApiMovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh danh sách
        $movie = Movie::
        join('countries', 'movies.country_id', '=', 'countries.id')
        ->join('producers', 'movies.producer_id', '=', 'producers.id')
        ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->select('movies.*', 'countries.country_name','producers.producer_name', 'movie_types.type_name')
        ->whereNull('movies.deleted_at')
        ->get();
//Trả về danh sách dưới dạng json
        return MovieResource::collection($movie);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $movie = Movie::create($request->all());
//        trả về thông vừa thêm
        return new MovieResource($movie);
    }

    /**
     * Display the specified resource.
     */
//    Hiển thị sửa
    public function show(string $id)
    {
        //
        $movie = Movie::
        join('countries', 'movies.country_id', '=', 'countries.id')
        ->join('producers', 'movies.producer_id', '=', 'producers.id')
        ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->find($id);
        if($movie){
            return new MovieResource($movie);
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
        $movie = Movie::find($id);
        if($movie){
            $movie->update($request->all());
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
        $movie = Movie::find($id);
        if($movie){
            $movie->delete();
            return  response()->json(['message'=>'Xóa thành công'], 280);
        }else{
            return  response()->json(['message'=>'Không tồn tại'], 404);
        }
    }
}
