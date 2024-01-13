<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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

    //quên mật khẩu
    public function forgot_password(Request $request)
    {
        $to_email = $request->email;
        $title_email = "Lấy lại mật khẩu " . $to_email;
        $user = User::where('email', $to_email)->first();
        if ($user) {
            $token_random = Str::random();
            $user_rs = User::find($user->id);
            $user_rs->user_token = $token_random;
            $user_rs->save();

            $link_rs_pass = url('http://localhost:5173/reset_password?email=' . $to_email . '&token=' . $token_random);

            $data = array("name" => $title_email, "body" => $link_rs_pass, "email" => $to_email);

            Mail::send('forgot_password', $data, function ($message) use ($title_email, $to_email) {
                $message->to($to_email)->subject($title_email);

                $message->from($to_email, $title_email);
            });
            return response()->json(["message" => "Gửi email thành công. Vui lòng check email để reset password"]);
        } else {
            return response()->json(["error" => "Email chưa được đăng ký"], 404);
        }
    }

    public function update_new_pass(Request $request)
    {
        $data = $request->all();

        $token_random = Str::random();
        $user = User::where('email', $data['email'])->where('user_token', $data['token'])->first();
        if ($user) {
            $validator = Validator::make(
                $data,
                [
                    'password' => [
                        'required',
                        'confirmed',
                        'min:8',
                        'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/'
                    ]
                ],
                [
                    'password.required' => "Mật khẩu không được để trống",
                    'password.confirmed' => "Mật khẩu không trùng khớp",
                    'password.min' | 'password.regex' => "Yêu cầu mật khẩu có ít nhất 8 ký tự, chứa các chữ cái và bao gồm các ký tự đặc biệt(*@!#...)."
                ]
            );
            if ($validator->fails()) {
                return response()->json($validator->messages());
            } else {
                $reset = User::find($user->id);
                $reset->password = bcrypt($data['password']);
                $reset->user_token = $token_random;
                $reset->save();
                return response()->json(["message" => "Đổi mật khẩu thành công. Vui lòng đăng nhập lại"]);
            }
        } else {
            return response()->json(["error" => "Vui lòng thực hiện lại vì link đã quá hạn"]);
        }
    }

    //cập nhật thông tin người dùng
    public function update_profile(Request $request)
    {
        $data = $request->all();
        $user = User::where("user_code", $data['user_code'])->first();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            $data['password'] = $user->password;
        }
        $user->update($data);
        return response(new UserResource($user), 201);
    }

    //đổi mật khẩu
    public function update_password(Request $request)
    {
        $data = $request->all();
        $user = User::where("user_code", $data['user_code'])->first();
        if (!Hash::check($data['old_password'], $user->password)) {
            return response()->json(['error' => "Mật khẩu cũ không chính xác"]);
        } else {
            $validator = Validator::make(
                $request->all(),
                [
                    'password' => [
                        'required',
                        'confirmed',
                        'min:8',
                        'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/'
                    ]
                ],
                [
                    'password.required' => "Mật khẩu không được để trống",
                    'password.confirmed' => "Mật khẩu không trùng khớp",
                    'password.min' | 'password.regex' => "Yêu cầu mật khẩu có ít nhất 8 ký tự, chứa các chữ cái và bao gồm các ký tự đặc biệt(*@!#...)."
                ]
            );
            if ($validator->fails()) {
                return response()->json($validator->messages());
            } else {
                $data['password'] = bcrypt($data['password']);
                $user->update($data);
                return response()->json(['message' => "Cập nhật mật khẩu thành công"]);
            }
        }
    }
}
