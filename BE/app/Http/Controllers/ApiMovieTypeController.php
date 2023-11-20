<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieTypeResource;
use App\Models\Movie_Type;
use Illuminate\Http\Request;

class ApiMovieTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh danh sách
        $movieType = Movie_Type::all();
//        Trả về danh sách dưới dạng json
        return MovieTypeResource::collection($movieType);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $movieType = Movie_Type::create($request->all());
//        trả về thông vừa thêm
        return new MovieTypeResource($movieType);
    }

    /**
     * Display the specified resource.
     */
//    Hiển thị sửa
    public function show(string $id)
    {
        //
        $movieType = Movie_Type::find($id);
        if($movieType){
            return new MovieTypeResource($movieType);
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
        $movieType = Movie_Type::find($id);
        if($movieType){
            $movieType->update($request->all());
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
        $movieType = Movie_Type::find($id);
        if($movieType){
            $movieType->delete();
            return  response()->json(['message'=>'Xóa thành công'], 280);
        }else{
            return  response()->json(['message'=>'Không tồn tại'], 404);
        }
    }
}
