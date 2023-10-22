<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket_Food extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'ticket_foods';
    protected $fillable = [
        'quantity',
        'total_money',
        'food_id',
        'bill_id'
    ];
}
