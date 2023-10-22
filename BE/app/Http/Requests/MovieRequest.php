<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovieRequest extends FormRequest
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
        $rules = [];
        $method = $this->route()->getActionMethod();
        switch ($this->method()){
            case 'POST':
                switch ($method){
                    case 'add':
                        $rules = [
                            'movie_name' => 'required',
                            'producer_name' => 'required',
                            'country_name' => 'required',
//                            'genre' => 'required',
                            'type_name' => 'required',
                            'director' => 'required',
                            'start_date' => 'required',
                            'end_date' => 'required',
                            'total_revenue' => 'required',
                            'image' => 'required',
//                            'trailer'=> 'required',
//                            'actor_name' => 'required',
//                            'gender' => 'required',
//                            'role' => 'required',
//                            'movie_role' => 'required'
                        ];
                        break;
                    case 'edit':
                        $rules = [
                            'movie_name' => 'required',
                            'producer_name' => 'required',
                            'country_name' => 'required',
//                            'genre' => 'required',
                            'type_name' => 'required',
                            'director' => 'required',
                            'start_date' => 'required',
                            'end_date' => 'required',
                            'total_revenue' => 'required',
//                            'actor_name' => 'required',
//                            'gender' => 'required',
//                            'role' => 'required',
//                            'movie_role' => 'required'
                        ];
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        return $rules;
    }
    public function messages()
    {
        return [
            'movie_name.required' => 'Không được bỏ trống tên phim',
            'producer_name.required' => 'Không được bỏ trống tên nhà sản xuất',
            'country_name.required' => 'Không được bỏ trống nước sản xuất',
            'genre.required' => 'Không được bỏ trống thể loại',
            'type_name.required' => 'Không được bỏ trống loại phim (2D - 3D)',
            'director.required' => 'Không được bỏ trống tên đạo diễn',
            'start_date.required' => 'Không được bỏ trống ngày bắt đầu',
            'end_date.required' => 'Không được bỏ trống ngày kết thúc',
            'total_revenue.required' => 'Không được bỏ trống tổng doanh thu',
//            'actor_name.required' => 'Không được bỏ trống tên diễn viên',
//            'gender.required' => 'Không được bỏ trống giới tính',
//            'role.required' => 'Không được bỏ trống tên vai trò (Diễn viên chính/Diễn viên phụ)',
//            'movie_role.required' => 'Không được bỏ trống tên vai diễn'
        ];
    }

}
