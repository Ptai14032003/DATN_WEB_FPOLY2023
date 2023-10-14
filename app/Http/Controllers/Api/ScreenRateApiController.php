<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ShowtimeResource;
use App\Models\Showtime;
use Illuminate\Http\Request;

class ScreenRateApiController extends Controller
{
    public function index(){
        $show_time = Showtime::all();
        return ShowtimeResource::collection($show_time);
    }
    public function store(Request $request){
        $show_time = Showtime::create($request->all());
        return new ShowtimeResource($show_time);
    }

    public function show(string $id){
        $show_time = Showtime::find($id);
        if($show_time){
            return new ShowtimeResource($show_time);
        }else{
            return response()->json(['messages'=>'Suất chiếu không tồn tại'],404);
        }
    }
    public function update(Request $request, string $id){
        $show_time = Showtime::find($id);
        if($show_time){
            $show_time->update($request->all());
            return response()->json(['messages'=>'Cập nhật xuất chiếu thành công'],202);
        }else{
            return response()->json(['messages'=>'Suất chiếu không tồn tại'],404);
        }
    }

    public function destroy(string $id){
        $show_time = Showtime::find($id);
        if($show_time){
            $show_time->delete();
            return response()->json(['messages'=>'Xóa xuất chiếu thành công'],202);
        }else{
            return response()->json(['messages'=>'Suất chiếu không tồn tại'],404);
        }
    }
}
