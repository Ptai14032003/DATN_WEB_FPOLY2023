<?php

namespace App\Http\Controllers;

use App\Http\Requests\ScreenRateRequest;
use App\Models\Movie;
use App\Models\Showtime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScreenRateController extends Controller
{
    public function show(){
        $screen_rates = DB::table('showtimes')
        ->join('movies','showtimes.movie_id','=','movies.id')
        ->join('movie_types','movies.movie_type_id','=','movie_types.id')
        ->join('rooms','showtimes.room_id','=','rooms.id')
        ->select('movies.*','movies.id','showtimes.*','movie_types.type_name','rooms.name')
        ->get();
        return view('ScreenRates.index',compact('screen_rates'));
    }

    public function add(ScreenRateRequest $request){
        if($request->isMethod('POST')){
            $params = $request->except('_token');
            $show_times = Showtime::create($params);
        }
        return view('ScreenRates.add');
    }

    public function edit(ScreenRateRequest $request,$id) {
        $screen_rates = DB::table('showtimes')->where('id',$id)->first();
        if($request->isMethod('POST')){
            $params = $request->except('_token');
            $show_times = DB::table('showtimes')->where('id',$id)->update($params);
            if($show_times){
                return redirect()->route('list-screen-rates');
            }
        }
        return view('ScreenRates.edit',compact('screen_rates'));
    }
    public function delete(ScreenRateRequest $request,$id) {
        $screen_rate = DB::table('showtimes')->where('id',$id)->delete();
        if($screen_rate){
            return redirect()->route('list-screen-rates');
        }
    }
}
