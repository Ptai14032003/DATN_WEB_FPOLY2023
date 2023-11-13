<?php

namespace App\Http\Controllers;
use App\Models\Actor;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movie = DB::select(' SELECT movies.id, movies.movie_name, producers.producer_name ,countries.country_name,movie_types.type_name , movies.director, movies.total_revenue, movies.image
        FROM movies
        INNER JOIN producers ON movies.producer_id = producers.id 
        INNER JOIN countries ON movies.country_id = countries.id
        INNER JOIN movie_types ON movies.movie_type_id = movie_types.id
  ');

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

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       
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
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       
    }
}
