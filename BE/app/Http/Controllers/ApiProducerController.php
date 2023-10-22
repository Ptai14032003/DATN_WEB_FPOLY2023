<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProducerResource;
use App\Models\Producer;
use Illuminate\Http\Request;

class ApiProducerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh danh sách
        $producer = Producer::all();
//        Trả về danh sách dưới dạng json
        return ProducerResource::collection($producer);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $producer = Producer::create($request->all());
//        trả về thông vừa thêm
        return new ProducerResource($producer);
    }

    /**
     * Display the specified resource.
     */
//    Hiển thị sửa
    public function show(string $id)
    {
        //
        $producer = Producer::find($id);
        if($producer){
            return new ProducerResource($producer);
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
        $producer = Producer::find($id);
        if($producer){
            $producer->update($request->all());
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
        $producer = Producer::find($id);
        if($producer){
            $producer->delete();
            return  response()->json(['message'=>'Xóa thành công'], 280);
        }else{
            return  response()->json(['message'=>'Không tồn tại'], 404);
        }
    }
}
