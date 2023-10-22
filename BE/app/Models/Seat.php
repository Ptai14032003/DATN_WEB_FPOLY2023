<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Seat extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'seats';
    protected $fillable = [
        'seat_code',
        'type_seat_id',
        'room_id',
        'status'//0 là còn trống,1 là đang chọn, 2 là đã đặt
    ];
}
