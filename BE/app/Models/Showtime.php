<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Showtime extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'showtimes';
    protected $fillable = [
        'movie_id',
        'room_id',
        'show_date',
        'show_time',
        'total_ticket_sold',
        'total_money'
    ];
}
