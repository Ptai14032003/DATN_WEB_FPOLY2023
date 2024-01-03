<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        switch($this->method()){
            case 'POST':
                $rule = [
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
                ]];
                break;
            case 'PUT':
                $rule = [
                    'name' => 'required',
                    'email' => [
                        'required',
                        'email',
                        //'unique:users,email'
                        Rule::unique('users')->ignore($this->id)
                    ],
                    'phone_number' => [
                        'required',
                        'regex:/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/',
                        //'unique:users,phone_number'.$this->user()
                        Rule::unique('users')->ignore($this->id)
                    ],
                    'password' => [
                        'required',
                        'confirmed',
                        'min:8',
                        'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/'

                    ]
                ];
                break;
            default:
                break;
        }
        return $rule;
    }
    public function messages(){
        return [
            'name.required' => "Tên không được để trống",
            'email.required' => "Email không được để trống",
            'email.email'=>"Email không đúng định dạng",
            'email.unique'=>"Email đã được đăng ký",
            'phone_number.required'=>"Số điện thoại không được để trống",
            'phone_number.regex'=>"Số điện thoại không đúng định dạng",
            'phone_number.unique'>"Số điện thoại đã được đăng ký",
            'password.required'=>"Mật khẩu không được để trống",
            'password.confirmed'=>"Mật khẩu không trùng khớp",
            'password.min'|'password.regex'=>"Yêu cầu mật khẩu có ít nhất 8 ký tự, chứa các chữ cái và bao gồm các ký tự đặc biệt(*@!#...)."
        ];
    }
}
