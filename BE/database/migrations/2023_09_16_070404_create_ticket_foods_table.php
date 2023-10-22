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
        Schema::create('ticket_foods', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity');
            $table->integer('total_money');
            $table->unsignedBigInteger('food_id');
            $table->unsignedBigInteger('bill_id');
            $table->timestamps();
            $table->foreign('food_id')->references('id')->on('foods');
            $table->foreign('bill_id')->references('id')->on('bills');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_foods');
    }
};
