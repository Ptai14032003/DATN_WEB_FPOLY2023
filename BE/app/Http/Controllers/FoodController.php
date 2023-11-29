<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
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
        return response()->json($food);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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
            'image' => $image,
        ];

        $newFood = Food::create($data);
        
    }else{
        return $this->returnError(202, 'file is required');
    }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $food = Food::find($id);
        return response()->json($food);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
       $food = Food::find($id);
       return response()->json($food);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $food = Food::find($id);
        $food->update($request->all());

        return response()->json([
            'message'=> "update successfully"
        ]);
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