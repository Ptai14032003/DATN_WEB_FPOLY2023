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
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::guard('users')->attempt(['email' => $request->email, 'password' => $request->password], false)) {
            $users = Auth::guard('users')->user();
            $token = $users->createToken($users->email . 'token')->plainTextToken;
            $user = new UserResource(Auth::guard('users')->user());
            return response([
                'user' => $user,
                'accessToken' => $token,
            ], 200);
        } elseif (Auth::guard('personnels')->attempt(['email' => $request->email, 'password' => $request->password], false)) {
            $personnel = Auth::guard('personnels')->user();
            $token = $personnel->createToken($personnel->email . 'token')->plainTextToken;
            $user = new PersonnelResource(Auth::guard('personnels')->user());
            return response([
                'user' => $user,
                'accessToken' => $token,
            ], 200);
        } else {
            // $error = "Thông tin tài khoản hoặc mật khẩu không chính xác";
            return response([
                'error' => "Thông tin tài khoản hoặc mật khẩu không chính xác"
            ], 422);
        }
    }

    public function register(Request $request)
    {
        // $data = $request->validated();
        // $data['password'] = bcrypt($data['password']);
        // $data['user_code'] = Helper::IDGenerator(new User, 'user_code', 6, "KH");
        // $user = User::create($data);
        // if ($user->id) {
        //     return response(new UserResource($user), 200);
        // } else {
        //     return response(['errors' => $data->errors()], 404);
        // }
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email|unique:personnels,email',
                'phone_number' => [
                    'required',
                    'regex:/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/',
                    'unique:users,phone_number',
                    'unique:personnels,phone_number'
                ],
                'password' => [
                    'required',
                    'confirmed',
                    'min:8',
                    'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/'
                ]
            ],
            [
                'name.required' => "Tên không được để trống",
                'email.required' => "Email không được để trống",
                'email.email' => "Email không đúng định dạng",
                'email.unique' => "Email đã được đăng ký",
                'phone_number.required' => "Số điện thoại không được để trống",
                'phone_number.regex' => "Số điện thoại không đúng định dạng",
                'phone_number.unique' => "Số điện thoại đã được đăng ký",
                'password.required' => "Mật khẩu không được để trống",
                'password.confirmed' => "Mật khẩu không trùng khớp",
                'password.min' | 'password.regex' => "Yêu cầu mật khẩu có ít nhất 8 ký tự, chứa các chữ cái và bao gồm các ký tự đặc biệt(*@!#...)."
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->messages());
        }
    }
    public function logout(Request $request)
    {
        $user = $request->user();
        // Hủy quyền truy cập của token hiện tại
        $user->currentAccessToken()->delete();

        return response(['mesage' => "Đăng xuất thành công"], 200);
    }

    public function refresh_token(Request $requet)
    {
    }
}
