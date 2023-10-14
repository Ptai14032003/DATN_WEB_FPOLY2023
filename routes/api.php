<?php

use App\Http\Controllers\Api\RoomApiController;
use App\Http\Controllers\Api\ShowtimeApiController;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('theater')->group(function (){
    Route::get('/',[RoomApiController::class,'index']);
    Route::post('/',[RoomApiController::class,'store']);
    Route::get('/{id}',[RoomApiController::class,'show']);
    Route::put('/{id}',[RoomApiController::class,'update']);
    Route::delete('/{id}',[RoomApiController::class,'destroy']);
});
Route::prefix('showtimes')->group(function (){
    Route::get('/',[ShowtimeApiController::class,'index']);
    Route::post('/',[ShowtimeApiController::class,'store']);
    Route::get('/{id}',[ShowtimeApiController::class,'show']);
    Route::put('/{id}',[ShowtimeApiController::class,'update']);
    Route::delete('/{id}',[ShowtimeApiController::class,'destroy']);
});

Route::apiResource('/users', UserController::class);
Route::apiResource('/personnels', PersonnelController::class);

