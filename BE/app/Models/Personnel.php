<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Personnel extends Authenticatable
{
    use HasApiTokens,HasFactory,SoftDeletes;
    protected $table = 'personnels';
    protected $fillable = [
        'personnel_code',
        'name',
        'email',
        'phone_number',
        'password',
        'address',
        'birthday',
        'gender',//0 là nữ, 1 là nam
        'role',//0 là nhân viên, 1 là admin
        'date_start'
    ];
}
