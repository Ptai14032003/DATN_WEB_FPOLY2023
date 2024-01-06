<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListGenreResource;
use App\Models\List_Genre;
use Illuminate\Http\Request;

class ApiListGenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh danh sách
        $listGenre = List_Genre::all();
//        Trả về danh sách dưới dạng json
        return response()->json($listGenre);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        $listGenres = $request->get('list_genres');

        $movieGenre = List_Genre::create($request->all());
        $movieGenre->list_genres = $listGenres;
        $movieGenre->save();
//        trả về thông vừa thêm
        return new ListGenreResource($movieGenre);
    }

    /**
     * Display the specified resource.
     */
//    Hiển thị sửa
    public function show(string $id)
    {
        //
        $listGenre = List_Genre::find($id);
        if($listGenre){
            return new ListGenreResource($listGenre);
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
        $listGenre = List_Genre::find($id);
        if($listGenre){
            $listGenre->update($request->all());
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
        $listGenre = List_Genre::find($id);
        if($listGenre){
            $listGenre->delete();
            return  response()->json(['message'=>'Xóa thành công'], 280);
        }else{
            return  response()->json(['message'=>'Không tồn tại'], 404);
        }
    }
}
