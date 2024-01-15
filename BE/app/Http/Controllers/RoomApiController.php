<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
use App\Http\Resources\RoomResource;
use App\Http\Resources\SeatResource;
use App\Models\Room;
use App\Models\Seat;
use App\Models\Type_Seat;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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
        $total = count($data);
        $validate=$data[$total-1];
        $validator = Validator::make(
            $validate,
            [
                'name' => 'required | unique:rooms,name',
                'row' => 'required',
                'col' => 'required'
            ],
            [
                'name.required' => "Chưa nhập tên phòng",
                'name.unique' => "Phòng đã có tên. Hãy nhập tên khác",
                'row.required' => "Chưa nhập số hàng",
                'col.required' => "Chưa nhập số cột"
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {
            foreach ($data as $roomData) {
                if (isset($roomData['name'])) {
                    $theater = Room::create([
                        "name" => $roomData['name'],
                        "row" => $roomData['row'],
                        "col" => $roomData['col']
                    ]);
                }
            }
            foreach ($data as $seats) {
                if (isset($seats['seat_code'])) {
                    Seat::create([
                        'seat_code' => $seats['seat_code'],
                        'type_seat_id' => $seats['type_seat_id'],
                        'room_id' => $theater->id,
                        'hidden' => $seats['hidden']
                    ]);
                }
            }
        }
    }
    public function show(string $id)
    {
        $theater = Room::find($id);
        $seats = Seat::where('room_id', '=', $id)->get();
        if ($theater) {
            if ($seats) {
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

    public function update(Request $request, $id)
    {
        $theater = Room::find($id);
        $data = $request->all();
        foreach ($data as $roomData) {
            if (isset($roomData['name'])) {
                $theater->update([
                    "name" => $roomData['name'],
                    "row" => $roomData['row'],
                    "col" => $roomData['col']
                ]);
            }
        }
        foreach ($data['seats'] as $seat) {
            if (isset($seat['id'])) {
                $seatModel = Seat::find($seat['id']);

                if ($seatModel) {
                    $seatModel->update([
                        'seat_code' => $seat['seat_code'],
                        'type_seat_id' => $seat['type_seat_id'],
                        'room_id' => $theater->id,
                        'hidden' => $seat['hidden']
                    ]);
                }
            }
        }
    }

    public function destroy(string $id)
    {
        $theater = Room::find($id);
        if ($theater) {
            $theater->delete();
            Seat::where('room_id', '=', $id)->delete();
            return response()->json(['message' => 'Xoa thanh cong'], 202);
        } else {
            return response()->json(['message' => 'Khach hang khong ton tai'], 404);
        }
    }
    public function destroyMultipleRoom(Request $request){
       
        $ids = $request->input('ids');
        Room::whereIn('id', $ids)->delete();

        return response()->json(['success' => 'Xóa nhiều room thành công']);
    }
}
