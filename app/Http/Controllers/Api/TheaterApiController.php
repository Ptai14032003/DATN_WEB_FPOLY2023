<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TheaterRequest;
use App\Http\Resources\TheaterResource;
use App\Models\Room;
use Illuminate\Http\Request;

class TheaterApiController extends Controller
{
    public function index(){
        $theater = Room::all();
        return TheaterResource::collection($theater);
    }
    public function store(TheaterRequest $request){
        $theater = Room::create($request->all());
        return new TheaterResource($theater);
    }

    public function show(string $id)
    {
        $theater = Room::find($id);
        if($theater){
            return new TheaterResource($theater);
        }else{
            return response()->json(['message'=>'Khach hang khong ton tai'],404);
        }
    }

    public function update(TheaterRequest $request, string $id)
    {
        $theater = Room::find($id);
        if($theater){
            $theater->update($request->all());
            return response()->json(['message'=>'Cap nhat thanh cong'],202);
        }else{
            return response()->json(['message'=>'Khach hang khong ton tai'],404);

        }
    }

    public function destroy(string $id)
    {
        $theater = Room::find($id);
        if($theater){
            $theater->delete();
            return response()->json(['message'=>'Xoa thanh cong'],202);
        }else{
            return response()->json(['message'=>'Khach hang khong ton tai'],404);
        }
    }
}
