<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

use function Laravel\Prompts\alert;

class QuanLyPhongChieuController extends Controller
{
    public function show_rooms(){
        $show = DB::table('rooms')
        ->select('*')
        ->get();
        return view('QuanLyPhongChieu.index',compact('show'));
    }

    public function addRooms(Request $request){
        if($request->isMethod('POST')){
            $params = $request->except('_token');
            $rooms = Room::create($params);
            if($rooms->id){
                Session::flash('success','Them thanh cong');
            }
        }
        return view('QuanLyPhongChieu.add');
    }

    public function editRooms(Request $request,$id){
        $rooms = DB::table('rooms')->where('id',$id)->first();
        if($request->isMethod('POST')){
            $params = $request->except('_token');
            $result = Room::where('id',$id)->update($params);
            if($result){
                Session::flash('success','Sua thanh cong');
                return redirect()->route('list-rooms',['id'=>$id]);
            }
        }
        return view('QuanLyPhongChieu.edit',compact('rooms'));
    }

    public function deleteRooms(Request $request,$id){
        $room = Room::where('id',$id)->delete();
        if($room){
            Session::flash('success', 'delete Success');
            return redirect()->route('list-rooms');
        }
    }
}
