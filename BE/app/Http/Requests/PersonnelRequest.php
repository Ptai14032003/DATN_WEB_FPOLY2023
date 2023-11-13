<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PersonnelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rule = [];
        switch ($this->method()) {
            case 'POST':
                $rule = [
                    'name' => 'required',
                    'email' => 'required|email|unique:personnels,email|unique:users,email',
                    'phone_number' => [
                        'required',
                        'regex:/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/',
                        'unique:personnels,phone_number',
                        'unique:users,phone_number'
                    ],
                    'password' => [
                        'required',
                        'confirmed',
                        'min:8',
                        'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/'
                    ],
                    'address' => 'required',
                    'birthday' => 'required',
                    'gender' => 'required',
                    'role' => 'required',
                    'date_start' => 'required|date|after_or_equal:today',
                ];
                break;
            case 'PUT':
                $rule = [
                    'name' => 'required',
                    'email' => [
                        'required',
                        'email',
                        //'unique:personnels,email'
                        Rule::unique('personnels')->ignore($this->id)
                    ],
                    'phone_number' => [
                        'required',
                        'regex:/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/',
                        //'unique:personnels,phone_number'.$this->id
                        Rule::unique('personnels')->ignore($this->id)
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
                    'date_start' => 'required|date',
                ];
                break;
        }
        return $rule;
    }
    public function messages()
    {
        return [
            'name.required' => "Tên không được để trống",
            'email.required' => "Email không được để trống",
            'email.email' => "Email không đúng định dạng",
            'email.unique' => "Email đã được đăng ký",
            'phone_number.required' => "Số điện thoại không được để trống",
            'phone_number.regex' => "Số điện thoại không đúng định dạng",
            'phone_number.unique' > "Số điện thoại đã được đăng ký",
            'password.required' => "Mật khẩu không được để trống",
            'password.confirmed' => "Mật khẩu không trùng khớp",
            'password.min' | 'password.regex' => "Yêu cầu mật khẩu có ít nhất 8 ký tự, chứa các chữ cái và bao gồm các ký tự đặc biệt(*@!#...).",
            'address.required' => "Địa chỉ không được để trống",
            'birthday.required' => "Ngày sinh không được để trống",
            'gender.required' => "Giới tính chưa được chọn",
            'role.required' => "Chức vụ chưa được chọn",
            'date_start.required' => "Ngày bắt đầu làm không được bỏ trống",
            'date_start.after_or_equal' => "Ngày bắt đầu làm phải bằng hoặc sau ngày hôm nay"
        ];
    }
}
