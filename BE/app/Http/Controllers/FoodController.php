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

    /**
     * Store a newly created resource in storage.
     */

    // public function store(Request $request)
    // {
    //     if($request->hasFile('image')){
    //         $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
    //         $image = $response;

    //         $food_name = $request->get('food_name');
    //         $price = $request->get('price');
    //         $food_type_id = $request->get('food_type_id');
            
    //         $data = [
    //             'food_name' => $food_name,
    //             'price' => $price,
    //             'food_type_id' => $food_type_id,
    //         ];
        
    //         Food::create($data);
    
    //     }else{
    //         return $this->returnError(202, 'file is required');
    //     }
    // }
    
    public function store(Request $request){
        
        if($request->hasFile('image')){
            $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $image = $response;
           
            $food_name = $request->get('food_name');
            $price = $request->get('price');
            $food_type_id = $request->get('food_type_id');
            $data = [
                'food_name' => $food_name,
                'price' => $price,
                'food_type_id' => $food_type_id,
            ];

            Food::create($data); 
              

        }else{
            return $this->returnError(202, 'file is required');
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
    public function update(Request $request, $id){
        $food = Food::findOrFail($id);
    
        // Validate the request data if needed
    
        $data = [
            'food_name' => $request->get('food_name'),
            'price' => $request->get('price'),
            'food_type_id' => $request->get('food_type_id'),
        ];
    
        // Check if a new image is provided
        if ($request->hasFile('image')) {
            // Upload the new image to Cloudinary
            $response = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $data['image'] = $response;
        
        } else {
            // If no new image is provided, keep the existing image path
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