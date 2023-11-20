<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Actor extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'actors';
    protected $fillable = [
        'actor_name',
        'gender',//0 là nữ, 1 là nam
        'movie_id',
        'role',//0 là diễn viên phụ, 1 là diễn viên chính
        'movie_role'//vai diễn
    ];
}
