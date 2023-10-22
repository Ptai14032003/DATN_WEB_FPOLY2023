<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Movie extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'movies';
    protected $fillable = [
        'movie_name',
        'producer_id',
        'country_id',
        'movie_type_id',
        'director',
        'start_date',
        'end_date',
        'total_revenue',
        'image',
        'trailer'
    ];
}
