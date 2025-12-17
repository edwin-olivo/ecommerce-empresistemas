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
        Schema::create('addresses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('name'); // Nombre de la dirección (ej: "Casa", "Oficina")
            $table->string('recipient'); // Nombre del destinatario
            $table->string('phone'); // Teléfono de contacto
            $table->string('street_address'); // Calle y número
            $table->string('apartment')->nullable(); // Apartamento, suite, etc.
            $table->string('city'); // Ciudad
            $table->string('state'); // Estado/Provincia
            $table->string('postal_code'); // Código postal
            $table->string('country'); // País
            $table->text('instructions')->nullable(); // Instrucciones especiales de entrega
            $table->boolean('is_default')->default(false); // Dirección por defecto
            $table->timestamps();
            $table->softDeletes(); // Para borrado suave
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
