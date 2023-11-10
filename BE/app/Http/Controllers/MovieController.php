<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Movie;
use App\Models\Movie_Type;
use App\Models\Producer;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movie = Movie::all();
        $movie_type = Movie_Type::all();
        $country = Country::all();
        $producer = Producer::all();
        return response()->json($movie);
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
        $name = $request->get('name');
        $producer = $request->get('produce');
        $country = $request->get('country');
        $movie_type = $request->get('movie_type');
        $director = $request->get('director');
        $start_date = $request->get('start_date');
        $end_date = $request->get('end_date');
        $tatol_revenue = $request->get('tatol_revenue');
        $image = $request->get('image');
        $data = [
            'movie_name' => $name,
            'producer_id' => $producer,
            'country_id' => $country,
            'movie_type_id' => $movie_type,
            'director' => $director,
            'start_date' => $start_date,    
            'end_date' => $end_date,
            'total_revenue'=> $tatol_revenue,
            'image' => $image,
        ];
        Movie::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
