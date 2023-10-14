<?php

use App\Http\Controllers\Api\ScreenRateApiController;
use App\Http\Controllers\Api\TheaterApiController;
use App\Http\Resources\ScreenRateResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('theater')->group(function (){
    Route::get('/',[TheaterApiController::class,'index']);
    Route::post('/',[TheaterApiController::class,'store']);
    Route::get('/{id}',[TheaterApiController::class,'show']);
    Route::put('/{id}',[TheaterApiController::class,'update']);
    Route::delete('/{id}',[TheaterApiController::class,'destroy']);
});

Route::prefix('showtimes')->group(function (){
    Route::get('/',[ScreenRateApiController::class,'index']);
    Route::post('/',[ScreenRateApiController::class,'store']);
    Route::get('/{id}',[ScreenRateApiController::class,'show']);
    Route::put('/{id}',[ScreenRateApiController::class,'update']);
    Route::delete('/{id}',[ScreenRateApiController::class,'destroy']);
});