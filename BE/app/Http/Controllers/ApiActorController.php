<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActorResource;
use App\Models\Actor;
use Illuminate\Http\Request;

class ApiActorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh danh sách
        $actor = Actor::join('movies', 'actors.movie_id', '=', 'movies.id') 
        ->select('actors.*', 'movies.movie_name')
        ->whereNull('actors.deleted_at')
        ->orderBy('actors.id', 'asc')->get();
        $actor->makeHidden(['movie_id']);
//        Trả về danh sách dưới dạng json
            return response()->json($actor);

    }

}

//     /**
//      * Store a newly created resource in storage.
//      */
//     public function store(Request $request)
//     {
//         $actor = Actor::create($request->all());
// //        trả về thông vừa thêm
//         return new ActorResource($actor);
//     }

//     /**
//      * Display the specified resource.
//      */
// //    Hiển thị sửa
//     public function show(string $id)
//     {
//         //
//         $actor = Actor::join('movies', 'actor.movie_id', '=', 'movies.id')->find($id);
//         if($actor){
//             return new ActorResource($actor);
//         }else{
//             return  response()->json(['message'=>'Không tồn tại'], 404);
//         }
//     }

//     /**
//      * Update the specified resource in storage.
//      */
//     public function update(Request $request, string $id)
//     {
//         $actor = Actor::find($id);
//         if($actor){
//             $actor->update($request->all());
//         }else{
//             return  response()->json(['message'=>'Không tồn tại'], 404);
//         }
//     }

//     /**
//      * Remove the specified resource from storage.
//      */
//     public function destroy(string $id)
//     {
//         //
//         $actor = Actor::find($id);
//         if($actor){
//             $actor->delete();
//             return  response()->json(['message'=>'Xóa thành công'], 280);
//         }else{
//             return  response()->json(['message'=>'Không tồn tại'], 404);
//         }
//     }
// }

