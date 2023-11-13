<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\PersonnelResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        if (Auth::guard('users')->attempt(['email' => $request->email, 'password' => $request->password], false)) {
            $users = Auth::guard('users')->user();
            $token = $users->createToken($users->email . 'token')->plainTextToken;
            $user = new UserResource(Auth::guard('users')->user());
            $cookie = cookie('jwt', $token, 60);
            return response([
                'user' => $user,
                'accessToken' => $token,
            ],200)->withCookie($cookie);
        } elseif (Auth::guard('personnels')->attempt(['email' => $request->email, 'password' => $request->password], false)) {
            $personnel = Auth::guard('personnels')->user();
            $token = $personnel->createToken($personnel->email . 'token')->plainTextToken;
            $user = new PersonnelResource(Auth::guard('personnels')->user());
            $cookie = cookie('jwt', $token, 60);
            return response([
                'user' => $user,
                'accessToken' => $token,
            ],200)->withCookie($cookie);
        } else {
            // $error = "Thông tin tài khoản hoặc mật khẩu không chính xác";
            return response([
                'error' => "Thông tin tài khoản hoặc mật khẩu không chính xác"
            ], 422);
        }
    }

    public function register(AuthRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['user_code'] = Helper::IDGenerator(new User, 'user_code', 6, "KH");
        $user = User::create($data);
        return response(new UserResource($user), 201);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        // Hủy quyền truy cập của token hiện tại
        $user->currentAccessToken()->delete();

        return response(['mesage' => "Đăng xuất thành công"], 200);
    }
}
