<?php

namespace Tests\Unit;

use App\Models\Ressource;
use App\Models\RessourcePartage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RessourcePartageTest extends TestCase
{
    use RefreshDatabase;

    public function test_ressource_partage_belongs_to_ressource_and_user(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $user = User::factory()->create();
        $ressource = Ressource::factory()->create();
        $partage = RessourcePartage::factory()->create([
            'user_id' => $user->id,
            'ressource_id' => $ressource->id,
        ]);

        // Act
        $linkedRessource = $partage->ressource;
        $linkedDestinataire = $partage->destinataire;

        // Assert
        $this->assertInstanceOf(Ressource::class, $linkedRessource);
        $this->assertEquals($ressource->id, $linkedRessource->id);

        $this->assertInstanceOf(User::class, $linkedDestinataire);
        $this->assertEquals($user->id, $linkedDestinataire->id);
    }
}
