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
        'trailer',
        'movie_time',
    ];

    public function countries()
{
    return $this->belongsTo(Country::class, 'country_id');
}

public function producers()
{
    return $this->belongsTo(Producer::class, 'producer_id');
}

public function movieType()
{
    return $this->belongsTo(Movie_Type::class, 'movie_type_id');
}

public function genres()
{
    return $this->belongsToMany(List_Genre::class, 'movie_genres', 'movie_id', 'list_genre_id');
}

public function actors()
{
    return $this->belongsToMany(Actor::class, 'movie_id');
}

}
