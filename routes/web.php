<?php

use App\Http\Controllers\QuanLyPhongChieuController;
use App\Http\Controllers\SuatChieuController;
use Illuminate\Support\Facades\Route;

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

// Rooms
Route::get('list-rooms',[QuanLyPhongChieuController::class,'show_rooms'])->name('list-rooms');
Route::match(['GET','POST'],'/add',[QuanLyPhongChieuController::class,'addRooms'])->name('add-rooms');
Route::match(['GET','POST'],'/edit/{id}',[QuanLyPhongChieuController::class,'editRooms'])->name('edit-rooms');
Route::get('/delete/{id}',[QuanLyPhongChieuController::class,'deleteRooms'])->name('delete-rooms');