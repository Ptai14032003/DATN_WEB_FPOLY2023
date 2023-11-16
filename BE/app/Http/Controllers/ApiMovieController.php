<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
use App\Models\Actor;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiMovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        
    // $producer = Producer::all();
    // $country = Country::all();
    // $movie_type = Movie_type::all();
    // return view('movie', ['produ'=>$producer,'country' => $country , 'movie_type' => $movie_type]);

        $movie =  Movie::
        join('countries', 'movies.country_id', '=', 'countries.id')
        ->join('producers', 'movies.producer_id', '=', 'producers.id')
        ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->select('movies.*', 'countries.country_name','producers.producer_name', 'movie_types.type_name')
        ->whereNull('movies.deleted_at')
        ->get();

     return response()->json($movie);
    }
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
        $gender = $request->get('gender');
        $role = $request->get('role');
        $movie_role = $request->get('movie_role');
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
        $movi = DB::select(' SELECT * FROM movies WHERE movie_name = :movie_name ', ['movie_name' => $name ]);
        foreach($movi as $movi) {
            $id = $movi->id;
            $newdata = [
                'actor_name' => $director,
                'gender' => $gender,
                'movie_id' => $id,
                'role' => $role,
                'movie_role' => $movie_role,
            ];
            Actor::create($newdata);
        }
    }

    /**
     * Display the specified resource.
     */

    public function show(string $id)
    {
        $movie = Movie::find($id);
        return response()->json($movie);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $movie = Movie::join('countries', 'movies.country_id', '=', 'countries.id')
            ->join('producers', 'movies.producer_id', '=', 'producers.id')
            ->join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
            ->select('movies.*', 'countries.country_name', 'producers.producer_name', 'movie_types.type_name')
            ->find($id);
        if ($movie) {
            return new MovieResource($movie);
        } else {
            return  response()->json(['message' => 'Không tồn tại'], 404);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $movie = Movie::find($id);

        $movie->update($request->all());

        return response()->json([
            'message'=> 'update successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movie = Movie::find($id);

        $movie->delete();
        return response()->json([
            'message'=> 'delete successfully'
        ]);
    }
}