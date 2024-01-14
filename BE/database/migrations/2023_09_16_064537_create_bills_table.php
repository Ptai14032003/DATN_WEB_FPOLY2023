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
            $table->string('personnel_code')->nullable();
            $table->integer('total_ticket');
            $table->integer('total_combo')->nullable();
            $table->string('discount_code')->nullable();
            $table->integer('additional_fee')->nullable();
            $table->integer('total_money');
            $table->dateTime('payment_time');
            $table->tinyInteger('status');
            $table->tinyInteger('export_ticket')->defaultValue('0');
            $table->timestamps();
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
