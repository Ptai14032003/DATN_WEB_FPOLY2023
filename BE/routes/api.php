<?php

use App\Http\Controllers\Api\RoomApiController;
use App\Http\Controllers\Api\ShowtimeApiController;
use App\Http\Controllers\ApiActorController;
use App\Http\Controllers\ApiCountryController;
use App\Http\Controllers\ApiListGenreController;
use App\Http\Controllers\ApiMovieController;
use App\Http\Controllers\ApiMovieGenreController;
use App\Http\Controllers\ApiMovieTypeController;
use App\Http\Controllers\ApiProducerController;
use App\Http\Controllers\ApiPromotionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TypeFoodController;
use Illuminate\Support\Facades\Route;

Route::match(['GET', 'POST'], '/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth:sanctum');
Route::get('/movie_home',[ HomeController::class, 'index'])->name('movie_home');
Route::post('/book_ticket', [TicketController::class, 'book_ticket'])->name('book_ticket')->middleware('auth:sanctum');
Route::get('/movie_show_time/{id}',[HomeController::class,'show_time_movie']);

Route::prefix('admin')->group(function () {
    Route::resource('bill', BillController::class);
    Route::resource('food', FoodController::class);
    Route::resource('food_type', TypeFoodController::class);
    Route::resource('movie', MovieController::class);

    Route::prefix('movies')->group(function () {
        Route::get('/', [ApiMovieController::class, 'index']);
        Route::post('/', [ApiMovieController::class, 'store']);
        Route::get('/{id}', [ApiMovieController::class, 'show']);
        Route::put('/{id}', [ApiMovieController::class, 'update']);
        Route::delete('/{id}', [ApiMovieController::class, 'destroy']);
    });

    Route::prefix('movie_genres')->group(function () {
        Route::get('/', [ApiMovieGenreController::class, 'index']);
        Route::post('/', [ApiMovieGenreController::class, 'store']);
        Route::get('/{id}', [ApiMovieGenreController::class, 'show']);
        Route::put('/{id}', [ApiMovieGenreController::class, 'update']);
        Route::delete('/{id}', [ApiMovieGenreController::class, 'destroy']);
    });

    Route::prefix('movie_type')->group(function () {
        Route::get('/', [ApiMovieTypeController::class, 'index']);
        Route::post('/', [ApiMovieTypeController::class, 'store']);
        Route::get('/{id}', [ApiMovieTypeController::class, 'show']);
        Route::put('/{id}', [ApiMovieTypeController::class, 'update']);
        Route::delete('/{id}', [ApiMovieTypeController::class, 'destroy']);
    });

    Route::prefix('list_genres')->group(function () {
        Route::get('/', [ApiListGenreController::class, 'index']);
        Route::post('/', [ApiListGenreController::class, 'store']);
        Route::get('/{id}', [ApiListGenreController::class, 'show']);
        Route::put('/{id}', [ApiListGenreController::class, 'update']);
        Route::delete('/{id}', [ApiListGenreController::class, 'destroy']);
    });

    Route::prefix('actors')->group(function () {
        Route::get('/', [ApiActorController::class, 'index']);
        Route::post('/', [ApiActorController::class, 'store']);
        Route::get('/{id}', [ApiActorController::class, 'show']);
        Route::put('/{id}', [ApiActorController::class, 'update']);
        Route::delete('/{id}', [ApiActorController::class, 'destroy']);
    });

    Route::prefix('countries')->group(function () {
        Route::get('/', [ApiCountryController::class, 'index']);
        Route::post('/', [ApiCountryController::class, 'store']);
        Route::get('/{id}', [ApiCountryController::class, 'show']);
        Route::put('/{id}', [ApiCountryController::class, 'update']);
        Route::delete('/{id}', [ApiCountryController::class, 'destroy']);
    });

    Route::prefix('producers')->group(function () {
        Route::get('/', [ApiProducerController::class, 'index']);
        Route::post('/', [ApiProducerController::class, 'store']);
        Route::get('/{id}', [ApiProducerController::class, 'show']);
        Route::put('/{id}', [ApiProducerController::class, 'update']);
        Route::delete('/{id}', [ApiProducerController::class, 'destroy']);
    });

    Route::prefix('promotions')->group(function () {
        Route::get('/', [ApiPromotionController::class, 'index']);
        Route::post('/', [ApiPromotionController::class, 'store']);
        Route::get('/{id}', [ApiPromotionController::class, 'show']);
        Route::put('/{id}', [ApiPromotionController::class, 'update']);
        Route::delete('/{id}', [ApiPromotionController::class, 'destroy']);
    });
    //
    Route::prefix('rooms')->group(function () {
        Route::get('/', [RoomApiController::class, 'index']);
        Route::post('/', [RoomApiController::class, 'store']);
        Route::get('/{id}', [RoomApiController::class, 'show']);
        Route::put('/{id}', [RoomApiController::class, 'update']);
        Route::delete('/{id}', [RoomApiController::class, 'destroy']);
    });
    Route::prefix('showtimes')->group(function () {
        Route::get('/', [ShowtimeApiController::class, 'index']);
        Route::post('/', [ShowtimeApiController::class, 'store']);
        Route::get('/{id}', [ShowtimeApiController::class, 'show']);
        Route::put('/{id}', [ShowtimeApiController::class, 'update']);
        Route::delete('/{id}', [ShowtimeApiController::class, 'destroy']);
    });

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/personnels', PersonnelController::class);
});
