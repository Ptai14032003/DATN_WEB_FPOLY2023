<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Movie_Genre extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'movie_genres';
    protected $fillable = [
        'movie_id',
        'list_genre_id'
    ];
}
