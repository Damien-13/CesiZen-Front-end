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
        Schema::create('commentaires', function (Blueprint $table) {
            $table->id();
            $table->text('lib_commentaire');
            $table->boolean('visible');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('ressource_id')->constrained();

            //Réponses à un commentaire nullable
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('commentaires')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commentaires');
    }
};
