<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class List_Genre extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'list_genres';
    protected $fillable = [
        'genre'
    ];
}
