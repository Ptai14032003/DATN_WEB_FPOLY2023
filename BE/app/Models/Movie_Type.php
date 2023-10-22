<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Movie_Type extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'movie_types';
    protected $fillable = [
        'type_name'
    ];
}
