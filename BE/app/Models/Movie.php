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
        'country_name',
        'movie_type_id',
        'genre',
        'director',
        'start_date',
        'end_date',
        'image',
        'trailer',
        'movie_time',
        'actor_name',
        'describe'
    ];



public function movieType()
{
    return $this->belongsTo(Movie_Type::class, 'movie_type_id');
}


}
