<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
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
        // $total = Room::join('seats','seats.room_id','=','seats.id')->where('id',$request->id)->count();
        $theater = Room::create(
            $request->all()
            
        );
        $type_seats = Type_Seat::all();
        if ($theater) {
            foreach ($type_seats as $type_seat) {
                // if($request->type_seat == 1){}
                if ($type_seat->id == 1) {
                    for ($i = 1; $i < 2; $i++) {
                        for ($y = 1; $y < 11; $y++) {
                            Seat::create(
                                [
                                    'seat_code' => 'A' . $y,
                                    'type_seat_id' => $type_seat->id,
                                    'room_id' => $theater->id,
                                    'status' => 0
                                ],
                            );
                        }
                    }
                    for ($i = 1; $i < 2; $i++) {
                        for ($y = 1; $y < 11; $y++) {
                            Seat::create(
                                [
                                    'seat_code' => 'B' . $y,
                                    'type_seat_id' => $type_seat->id,
                                    'room_id' => $theater->id,
                                    'status' => 0
                                ],
                            );
                        }
                    }
                    for ($i = 1; $i < 2; $i++) {
                        for ($y = 1; $y < 11; $y++) {
                            Seat::create(
                                [
                                    'seat_code' => 'C' . $y,
                                    'type_seat_id' => $type_seat->id,
                                    'room_id' => $theater->id,
                                    'status' => 0
                                ],
                            );
                        }
                    }
                    for ($i = 1; $i < 2; $i++) {
                        for ($y = 1; $y < 11; $y++) {
                            Seat::create(
                                [
                                    'seat_code' => 'D' . $y,
                                    'type_seat_id' => $type_seat->id,
                                    'room_id' => $theater->id,
                                    'status' => 0
                                ],
                            );
                        }
                    }
                }
            
            // if($request->type_seat == 2){}
                if ($type_seat->id == 2) {
                    for ($i = 1; $i < 2; $i++) {
                        for ($y = 1; $y < 11; $y++) {
                            Seat::create(
                                [
                                    'seat_code' => 'E' . $y,
                                    'type_seat_id' => $type_seat->id,
                                    'room_id' => $theater->id,
                                    'status' => 0
                                ],
                            );
                        }
                    }
                    for ($i = 1; $i < 2; $i++) {
                        for ($y = 1; $y < 11; $y++) {
                            Seat::create(
                                [
                                    'seat_code' => 'F' . $y,
                                    'type_seat_id' => $type_seat->id,
                                    'room_id' => $theater->id,
                                    'status' => 0
                                ],
                            );
                        }
                    }
                    for ($i = 1; $i < 2; $i++) {
                        for ($y = 1; $y < 11; $y++) {
                            Seat::create(
                                [
                                    'seat_code' => 'G' . $y,
                                    'type_seat_id' => $type_seat->id,
                                    'room_id' => $theater->id,
                                    'status' => 0
                                ],
                            );
                        }
                    }
                    for ($i = 1; $i < 2; $i++) {
                        for ($y = 1; $y < 11; $y++) {
                            Seat::create(
                                [
                                    'seat_code' => 'H' . $y,
                                    'type_seat_id' => $type_seat->id,
                                    'room_id' => $theater->id,
                                    'status' => 0
                                ],
                            );
                        }
                    }
                }
            
            // if($request->type_seat == 3){}
                if($type_seat->id == 3){
                    for ($i = 1; $i <2; $i++){
                        for ($y = 1; $y < 9; $y++) {
                            Seat::create(
                                [
                                    'seat_code' => 'I'.$y,
                                    'type_seat_id' => $type_seat->id,
                                    'room_id' => $theater->id,
                                    'status' => 0
                                ],
                            );
                        }
                    }
                }
            
            }
        }
        return new RoomResource($theater);
    }
    public function show(string $id)
    {
        $theater = Room::find($id);
        if ($theater) {
            return new RoomResource($theater);
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
            return response()->json(['message' => 'Xoa thanh cong'], 202);
        } else {
            return response()->json(['message' => 'Khach hang khong ton tai'], 404);
        }
    }
}
