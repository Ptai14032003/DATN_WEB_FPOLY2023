<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Food extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'foods';
    protected $fillable = [
        'food_name',
        'price',
        'food_type_id'
    ];
}
