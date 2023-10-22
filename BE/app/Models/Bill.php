<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bill extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'bills';
    protected $fillable = [
        'user_code',
        'personnel_id',
        'total_ticket',
        'total_popcorn',
        'total_combo',
        'discount_code',
        'additional_fee',
        'total_money',
        'payment_time',
        'status'//0 là chưa thanh toán, 1 là đã thanh toán, 2 là đã hủy
    ];
}
