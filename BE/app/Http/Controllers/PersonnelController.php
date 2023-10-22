<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\PersonnelRequest;
use App\Http\Resources\PersonnelResource;
use App\Models\Personnel;
use Illuminate\Http\Request;

class PersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return PersonnelResource::collection(Personnel::query()->orderBy('id', 'desc')->paginate(15));
    }

    /**
     * Show the form for creating a new resource.
     */
   
    /**
     * Store a newly created resource in storage.
     */
    public function store(PersonnelRequest $request)
    {
        //
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['personnel_code'] = Helper::IDGenerator(new Personnel, 'personnel_code', 6, 'NV');
        $personnel = Personnel::create($data);
        return response(new PersonnelResource($personnel), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $personnel = Personnel::find($id);
        return new PersonnelResource($personnel);
    }

    /**
     * Show the form for editing the specified resource.
     */
 

    /**
     * Update the specified resource in storage.
     */
    public function update(PersonnelRequest $request, string $id)
    {
        //
        $data = $request->validated();
        $personnel = Personnel::find($id);
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }
        $data['personnel_code'] = $personnel->personnel_code;
        $personnel->update($data);
        return response(new PersonnelResource($personnel),200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $personnel = Personnel::find($id);
        $personnel->delete();
        return response()->json(['message' => 'Xóa nhân viên thành công'],204);
    }
}
