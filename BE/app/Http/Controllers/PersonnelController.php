<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\PersonnelRequest;
use App\Http\Resources\PersonnelResource;
use App\Models\Personnel;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return PersonnelResource::collection(Personnel::all()->sortByDesc("id"));
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|email|unique:personnels,email|unique:users,email',
                'phone_number' => [
                    'required',
                    'regex:/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/',
                    'unique:personnels,phone_number',
                    'unique:users,phone_number',
                ],
                'password' => [
                    'required',
                    'min:8',
                    'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/'
                ],
                'address' => 'required',
                'birthday' => 'required',
                'gender' => 'required',
                'role' => 'required',
                'date_start' => 'required|date|after_or_equal:today',
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
                'password.min' | 'password.regex' => "Yêu cầu mật khẩu có ít nhất 8 ký tự, chứa các chữ cái và bao gồm các ký tự đặc biệt(*@!#...).",
                'address.required' => "Địa chỉ không được để trống",
                'birthday.required' => "Ngày sinh không được để trống",
                'gender.required' => "Giới tính chưa được chọn",
                'role.required' => "Chức vụ chưa được chọn",
                'date_start.required' => "Ngày bắt đầu làm không được bỏ trống",
                'date_start.after_or_equal' => "Ngày bắt đầu làm phải bằng hoặc sau ngày hôm nay"
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {
            $data = $request->all();
            $data['password'] = bcrypt($data['password']);
            $data['gender'] = $data['gender'] == "Nam" ? 1 : 0;
            $data['role'] = $data['role'] == "Nhân viên" ? 0 : 1;
            $data['birthday'] = Carbon::parse($data['birthday'])->format('Y-m-d');
            $data['date_start'] = Carbon::parse($data['date_start'])->format('Y-m-d');
            $data['personnel_code'] = Helper::IDGenerator(new Personnel, 'personnel_code', 6, 'NV');
            $personnel = Personnel::create($data);
            return response(new PersonnelResource($personnel), 201);
        }
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
    public function update(Request $request, string $id)
    {
        //

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('personnels')->ignore($id),
                    function ($attribute, $value, $fail) use ($id) {
                        // Kiểm tra sự tồn tại trong users khi email thay đổi
                        $userWithEmail = User::where('email', $value)->first();
                        if ($userWithEmail) {
                            $fail('Email đã được đăng ký.');
                        }
                    },
                ],
                'phone_number' => [
                    'required',
                    'regex:/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/',
                    Rule::unique('personnels')->ignore($id),
                    function ($attribute, $value, $fail) use ($id) {
                        // Kiểm tra sự tồn tại trong users khi phone_number thay đổi
                        $userWithPhoneNumber = User::where('phone_number', $value)->first();
                        if ($userWithPhoneNumber) {
                            $fail('Số điện thoại đã được đăng ký.');
                        }
                    },
                ],
                'password' => [
                    'required',
                    'min:8',
                    'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/',
                ],
                'address' => 'required',
                'birthday' => 'required',
                'gender' => 'required',
                'role' => 'required',
                'date_start' => 'required|date|after_or_equal:today',
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
                'password.min' | 'password.regex' => "Yêu cầu mật khẩu có ít nhất 8 ký tự, chứa các chữ cái và bao gồm các ký tự đặc biệt(*@!#...).",
                'address.required' => "Địa chỉ không được để trống",
                'birthday.required' => "Ngày sinh không được để trống",
                'gender.required' => "Giới tính chưa được chọn",
                'role.required' => "Chức vụ chưa được chọn",
                'date_start.required' => "Ngày bắt đầu làm không được bỏ trống",
                'date_start.after_or_equal' => "Ngày bắt đầu làm phải bằng hoặc sau ngày hôm nay"
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {
            $data = $request->all();
            $personnel = Personnel::find($id);
            if ($data['password'] != $personnel->password) {
                $data['password'] = bcrypt($data['password']);
            }
            $data['personnel_code'] = $personnel->personnel_code;
            $data['gender'] = $data['gender'] == "Nam" ? 1 : 0;
            $data['role'] = $data['role'] == "Nhân viên" ? 0 : 1;
            $data['birthday'] = Carbon::parse($data['birthday'])->format('Y-m-d');
            $data['date_start'] = Carbon::parse($data['date_start'])->format('Y-m-d');
            $personnel->update($data);
            return response(new PersonnelResource($personnel), 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $personnel = Personnel::find($id);
        $personnel->delete();
        return response()->json(['message' => 'Xóa nhân viên thành công'], 204);
    }
}
