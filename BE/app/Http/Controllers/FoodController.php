<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $food = Food::all();
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
        $food_name = $request->get('food_name');
        $price = $request->get('price');
        $food_type_id = $request->get('food_type_id');

        $data = [
            'food_name' => $food_name,
            'price' => $price,
            'food_type_id' => $food_type_id,
        ];

        $newFood = Food::create($data);
        return response()->json(
            $newFood ,
            ["message" => "created successfully"]
        );
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
