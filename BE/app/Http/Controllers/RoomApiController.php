<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
use App\Http\Resources\RoomResource;
use App\Http\Resources\SeatResource;
use App\Models\Room;
use App\Models\Seat;
use App\Models\Type_Seat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomApiController extends Controller
{
    public function index(Request $request)
    {
        $theater = Room::all();
        return RoomResource::collection($theater);
    }
    public function store(Request $request)
    {
        $data = $request->all();
        foreach($data as $roomData){
            if(isset($roomData['name'])){
                $theater = Room::create([
                    "name"=>$roomData['name'],
                    "total_seat" => $roomData['total_seat'],
                    "row" => $roomData['row'],
                    "col" => $roomData['col']
                ]);
            }
        }
        foreach($data as $seats){
            if(isset($seats['seat_code'])){
                Seat::create([
                    'seat_code' => $seats['seat_code'],
                    'type_seat_id'=> $seats['type_seat_id'],
                    'room_id' => $theater->id,
                    'hidden'=>$seats['hidden']
                ]);
            }   
        }
    }
    public function show(string $id)
    {
        $theater = Room::find($id);
        $seats = Seat::where('room_id','=',$id)->get();
        if($theater){
            if($seats){
                $response = [
                    'theaters' => $theater,
                    'seats' => $seats
                ];
                return response()->json($response, 200);
            }
        } else {
            return response()->json(['message' => 'Khach hang khong ton tai'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        $theater = Room::find($id);
        if ($theater) {
            $theater->update($request->all());
            return response()->json(['message' => 'Cap nhat thanh cong'], 202);
        } else {
            return response()->json(['message' => 'Khach hang khong ton tai'], 404);
        }
    }

    public function destroy(string $id)
    {
        $theater = Room::find($id);
        if ($theater) {
            $theater->delete();
            Seat::where('room_id','=',$id)->delete();
            return response()->json(['message' => 'Xoa thanh cong'], 202);
        } else {
            return response()->json(['message' => 'Khach hang khong ton tai'], 404);
        }
    }
}
