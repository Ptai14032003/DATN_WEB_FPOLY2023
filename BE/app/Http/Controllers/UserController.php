<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return UserResource::collection(User::all()->sortByDesc("id"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        //
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['user_code'] = Helper::IDGenerator(new User, 'user_code', 6, "KH");
        $data['address'] = $request->address ?? null;
        $data['birthday'] = $request->birthday ?? null;
        $data['gender'] = $request->gender ?? null;
        $user = User::create($data);
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = User::find($id);
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        //
        $user = User::find($id);
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['user_code'] = $user->user_code;
        $data['address'] = $request->address ?? $user->address;
        $data['birthday'] = $request->birthday ?? $user->birthday;
        $data['gender'] = $request->gender ?? $user->gender;
        $user->update($data);
        return response(new UserResource($user), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $user = User::find($id);
        $user->delete();
        return response()->json(['mesage' => 'Xóa User thành công'], 204);
    }
}
