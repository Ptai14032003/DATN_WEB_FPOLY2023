<?php

namespace App\Http\Controllers;

use App\Models\Food_Type;
use Illuminate\Http\Request;

class TypeFoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $food_type = Food_Type::all();
        return response()->json($food_type);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $name = $request->all();
        foreach($name as $name) {
            $add = $name['name'];
            $data = [ 
                'name' =>  $add,
            ];
            Food_Type::create($data);
        }
        
        
        return response()->json(
           
            [
                "message" => "created successfully"
            ]
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $food_type = Food_type::find($id);
        return response()->json($food_type);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $food_type = Food_type::find($id);
        return response()->json($food_type);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $food_type = Food_type::find($id);
        $food_type->update($request->all());

        return response()->json([
            'message'=> 'update successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $food_type = Food_type::find($id);
        $food_type->delete();
        return response()->json([
            'message'=> 'delete successfully'
        ]);
    }
}
