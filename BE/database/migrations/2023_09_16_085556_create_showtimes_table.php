<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('showtimes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('movie_id');
            $table->unsignedBigInteger('room_id');
            $table->date('show_date');
            $table->dateTime('show_time')->format('d-m-Y H:i:s');
            $table->integer('total_ticket_sold')->default(0);
            $table->integer('total_money')->default(0);
            $table->timestamps();
            $table->foreign('movie_id')->references('id')->on('movies');
            $table->foreign('room_id')->references('id')->on('rooms');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('showtimes');
    }
};
