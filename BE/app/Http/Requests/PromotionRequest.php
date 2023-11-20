<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PromotionRequest extends FormRequest
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
                           'discount_code' => 'required',
                           'event' => 'required',
                           'start' => 'required',
                           'end' => 'required',
                           'discount_percent' => 'required'
                       ];
                       break;
                   case 'edit':
                       $rules = [
                           'discount_code' => 'required',
                           'event' => 'required',
                           'start' => 'required',
                           'end' => 'required',
                           'discount_percent' => 'required'
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
            'discount_code.required' => 'Không được bỏ trống mã giảm giá',
            'event.required' => 'Không được bỏ trống tên sự kiện',
            'start.required' => 'Không được bỏ trống ngày bắt đầu',
            'end.required' => 'Không được bỏ trống ngày kết thúc',
            'discount_percent.required' => 'Không được bỏ trống mức giảm'
        ];
    }

}
