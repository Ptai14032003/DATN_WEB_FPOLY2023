<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoomRequest extends FormRequest
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
        switch($this->method()){
            case 'POST':
                switch ($method){
                    case 'add':
                        $rules = [
                            'name' => 'required',
                            'name'=>'unique',
                            'total_seat' => 'required',
                            'row' => 'required',
                            'col' => 'required'
                        ];
                        break;
                    case 'edit':
                        $rules = [
                            'name' => 'required',
                            'total_seat' => 'required'
                        ];
                        break;
                    default: break;
                }
                default: break;
        } return $rules;
    }
    public function messages()
    {
        return [
            'name.required' => "Hãy nhập tên phòng",
            'name.unique' => "Phòng đã có tên. Hãy nhập tên khác",
            'total_seat' => "Hãy nhập tổng số ghế"
        ];
    }
}
