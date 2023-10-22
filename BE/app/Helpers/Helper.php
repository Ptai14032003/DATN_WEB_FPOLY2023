<?php
namespace App\Helpers;

class Helper{

    public static function IDGenerator($model, $column, $length, $prefix){
        $data = $model::orderBy('id', 'desc')->first();
        if(!$data){
            $og_length = $length-1;
            $last_number = '1';
        }else{
            $code = substr($data->$column, strlen($prefix) + 1);//vd: KH-001->lấy phần 001
            $actical_last_number = ($code / 1) * 1;//nếu phần số cuối là 0001 ->số cuối thực tế là (0001/1)*1=1
            $last_number = $actical_last_number + 1;//tăng số cuối lên
            $last_number_length = strlen($last_number);
            $og_length = $length - $last_number_length;
        }
        $zeros = '';
        for($i=0;$i<$og_length;$i++){
            $zeros .= "0";
        }
        return $prefix . '-' . $zeros . $last_number;
    }
}