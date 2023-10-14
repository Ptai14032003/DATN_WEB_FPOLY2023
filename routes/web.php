<?php

use App\Http\Controllers\TheaterController;
use App\Http\Controllers\SuatChieuController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScreenRateController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('list',[SuatChieuController::class,'show_suat_chieu'])->name('list-suatchieu');

// Rooms route
Route::get('list-rooms',[TheaterController::class,'show_rooms'])->name('list-room');
Route::match(['GET','POST'],'/room/add',[TheaterController::class,'addRooms'])->name('add-room');
Route::match(['GET','POST'],'/room/edit/{id}',[TheaterController::class,'editRooms'])->name('edit-room');
Route::get('/room/delete/{id}',[TheaterController::class,'deleteRooms'])->name('delete-room');

// Route screening rate
Route::get('/list-screen-rate',[ScreenRateController::class,'show'])->name('list-screen-rates');
Route::match(['GET','POST'],'screen-rate/add',[ScreenRateController::class,'add'])->name('add-screen-rates');
Route::match(['GET','POST'],'screen-rate/edit/{id}',[ScreenRateController::class,'edit'])->name('edit-screen-rates');
Route::get('screen-rate/delete/{id}',[ScreenRateController::class,'delete'])->name('delete-screen-rates');