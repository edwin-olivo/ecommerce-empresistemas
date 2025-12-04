<?php

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use HasUuids;

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('whislist_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->char('whishlist_id', 36);
            $table->foreign('whishlist_id')->references('id')->on('wishlists')->onDelete('cascade');
            $table->char('product_id', 36);
            $table->foreign('product_id')->references('id')->on('aos_products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whislist_items');
    }
};
