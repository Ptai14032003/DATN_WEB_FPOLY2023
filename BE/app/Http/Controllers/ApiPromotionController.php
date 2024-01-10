<?php

namespace App\Http\Controllers;

use App\Http\Resources\PromotionResource;
use App\Models\Promotion;
use Illuminate\Http\Request;

class ApiPromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh danh sách
        $promotion = Promotion::all();
//        Trả về danh sách dưới dạng json

        return response()->json($promotion);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $promotion = Promotion::create($request->all());
        return response()->json($promotion);
    }

    /**
     * Display the specified resource.
     */
//    Hiển thị sửa
    public function show(string $id)
    {
        //
        $promotion = Promotion::find($id);
        if($promotion){
            return response()->json($promotion);
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
        $promotion = Promotion::find($id);
        if($promotion){
            $promotion->update($request->all());
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
        $promotion = Promotion::find($id);
        if($promotion){
            $promotion->delete();
            return  response()->json(['message'=>'Xóa thành công'], 280);
        }else{
            return  response()->json(['message'=>'Không tồn tại'], 404);
        }
    }

    public function destroyMultiplePromotion(Request $request){
    
        $ids = $request->input('ids');

        Promotion::whereIn('id', $ids)->delete();
        
        return response()->json(['success' => 'Xóa nhiều khuyến mãi thành công']);
    }
}
