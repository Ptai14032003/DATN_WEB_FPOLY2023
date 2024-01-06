<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Cloudinary\Cloudinary;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $food = Food::join('food_types', 'foods.food_type_id', '=', 'food_types.id')
        ->select('foods.*', 'food_types.name')
        ->whereNull('foods.deleted_at')
        ->get();
        $food->makeHidden(['food_type_id']);

        return response()->json($food);

    }

    public function store(Request $request){
        
        if($request->hasFile('image')){
            $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $image = $response;
           
            $food_name = $request->get('food_name');
            $price = $request->get('price');
            $food_type_id = $request->get('food_type_id');
            $data = [
                'image' => $image,
                'food_name' => $food_name,
                'price' => $price,
                'food_type_id' => $food_type_id,
            ];

            Food::create($data);   
            return response()->json(['message' => 'Thêm Thành công'], 200);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $food = Food::join('food_types', 'foods.food_type_id', '=', 'food_types.id')
            ->select('foods.*', 'food_types.name')
            ->where('foods.id', $id)
            ->whereNull('foods.deleted_at')
            ->first();
    
        if ($food) {
            return response()->json($food);
        } else {
            return response()->json(['message' => 'Không tồn tại'], 404);
        }
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,string $id){
        $food = Food::find($id);
    
        if (!$food) {
            return response()->json(['messages' => 'Đô ăn không tồn tại'], 404);
        }
        // Update the movie data
        $food->update($request->all());
    
        if ($request->hasFile('image')) {
            // Upload the new image to Cloudinary
            $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $data['image'] = $response;
            // Delete old image from Cloudinary
            $oldImage = $food->image;
            if ($oldImage) {
                $publicId = cloudinary()->getPublicIdFromPath($oldImage);
                cloudinary()->destroy($publicId);
            }
        } else {
            // If no new image is provided, keep the existing image
            $data['image'] = $food->image;
        }
        $food->update($data);
        return response()->json($food);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       $food = Food::find($id);
       $food->delete();
       return response()->json([
        "message" => "delete successfully"
       ]);
    }
}

