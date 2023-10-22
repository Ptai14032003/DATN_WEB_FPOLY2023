<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ScreenRateRequest extends FormRequest
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
                switch($method){
                    case 'add':
                        $rules = [
                            "movie_id" => "required",
                            "room_id" => "required",
                            "show_date" => "required",
                            "show_time" => "required",
                            "type_name" => "required",
                            "total_ticket_sold" => "required",
                            "total_money" => "required",
                        ]; break;
                    case 'edit':
                        $rules = [
                            "movie_id" => "required",
                            "room_id" => "required",
                            "show_date" => "required",
                            "show_time" => "required",
                            "type_name" => "required",
                            "total_ticket_sold" => "required",
                            "total_money" => "required",
                        ]; break;
                    default: break;
                }
        default: break;
        } return $rules;
    }

    public function messages()
    {
        return [
            "movie_id.requied" => "Hãy nhập tên phim",
            "room_id.requied" => "Hãy nhập thông tin phòng",
            "show_date.requied" => "Hãy nhập ngày chiếu",
            "show_time.requied" => "Hãy nhập suất chiếu",
            "type_name.requied" => "Hãy nhập thể lại phim",
            "total_ticket_sold.requied" => "Hãy nhập tổng số vé bán",
            "total_money.requied" => "Hãy nhập tổng tiền",
        ];
    }
}
