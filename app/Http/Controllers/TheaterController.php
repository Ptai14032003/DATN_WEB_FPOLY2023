<?php

namespace App\Http\Controllers;

use App\Http\Requests\TheaterRequest;
use App\Models\Room;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class TheaterController extends Controller
{
    public function show_rooms(){
        $show = DB::table('rooms')
        ->select('*')
        ->get();
        return view('Theaters.index',compact('show'));
    }

    public function addRooms(TheaterRequest $request){
        if($request->isMethod('POST')){
            $params = $request->except('_token');
            $rooms = Room::create($params);
            if($rooms->id){
                Session::flash('success','Thêm thành công');
            }
        }
        return view('Theaters.add');
    }

    public function editRooms(TheaterRequest $request,$id){
        $rooms = DB::table('rooms')->where('id',$id)->first();
        if($request->isMethod('POST')){
            $params = $request->except('_token');
            $result = Room::where('id',$id)->update($params);
            if($result){
                Session::flash('success','Sửa thành công');
                return redirect()->route('list-room');
            }
        }
        return view('Theaters.edit',compact('rooms'));
    }

    public function deleteRooms(TheaterRequest $request,$id){
        $room = Room::where('id',$id)->delete();
        if($room){
            Session::flash('success', 'Xóa thành công');
            return redirect()->route('list-room');
        }
    }
}
