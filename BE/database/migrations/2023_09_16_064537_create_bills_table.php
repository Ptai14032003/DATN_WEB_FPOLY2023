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
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->string('user_code')->nullable();
            $table->unsignedBigInteger('personnel_id');
            $table->integer('total_ticket');
            $table->integer('total_drink');
            $table->integer('total_popcorn');
            $table->integer('total_combo');
            $table->string('discount_code')->nullable();
            $table->integer('additional_fee')->nullable();
            $table->integer('total_money');
            $table->dateTime('payment_time');
            $table->tinyInteger('status');
            $table->timestamps();
            $table->foreign('personnel_id')->references('id')->on('personnels');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
