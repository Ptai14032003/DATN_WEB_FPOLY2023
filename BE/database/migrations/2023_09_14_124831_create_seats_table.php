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
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->string('seat_code');
            $table->unsignedBigInteger('type_seat_id');
            $table->unsignedBigInteger('room_id');
            $table->tinyInteger('status');
            $table->timestamps();
            $table->foreign('type_seat_id')->references('id')->on('type_seats');
            $table->foreign('room_id')->references('id')->on('rooms');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
