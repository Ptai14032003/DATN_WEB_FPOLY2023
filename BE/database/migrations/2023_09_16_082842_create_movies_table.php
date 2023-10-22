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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('movie_name');
            $table->unsignedBigInteger('producer_id');
            $table->unsignedBigInteger('country_id');
            $table->unsignedBigInteger('movie_type_id');
            $table->string('director');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_revenue');
            $table->string('image');
            $table->string('trailer');
            $table->timestamps();
            $table->foreign('producer_id')->references('id')->on('producers');
            $table->foreign('country_id')->references('id')->on('countries');
            $table->foreign('movie_type_id')->references('id')->on('movie_types');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
