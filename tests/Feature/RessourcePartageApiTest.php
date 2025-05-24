<?php

namespace Tests\Feature;

use App\Models\Ressource;
use App\Models\RessourcePartage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RessourcePartageApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_ressource_partages(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $userActif = User::factory()->create(['actif' => 1]);
        $userInactif = User::factory()->create(['actif' => 0]);

        $ressource = Ressource::factory()->create();
        $partageActif = RessourcePartage::factory()->create([
            'user_id' => $userActif->id,
            'ressource_id' => $ressource->id,
        ]);
        $partageInactif = RessourcePartage::factory()->create([
            'user_id' => $userInactif->id,
            'ressource_id' => $ressource->id,
        ]);

        // Act
        $response = $this->getJson('/api/ressource_partages');

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Liste des ressources récupérée avec succès',
            ])
            ->assertJsonFragment([
                'id' => $partageActif->id,
            ])
            ->assertJsonMissing([
                'id' => $partageInactif->id,
            ]);
    }

    public function test_can_filter_ressource_partages_by_ressource_id(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $user = User::factory()->create(['actif' => 1]);
        $ressource1 = Ressource::factory()->create();
        $ressource2 = Ressource::factory()->create();

        $partage1 = RessourcePartage::factory()->create([
            'user_id' => $user->id,
            'ressource_id' => $ressource1->id,
        ]);
        $partage2 = RessourcePartage::factory()->create([
            'user_id' => $user->id,
            'ressource_id' => $ressource2->id,
        ]);

        // Act
        $response = $this->getJson('/api/ressource_partages?ressource_id=' . $ressource1->id);

        // Assert
        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $partage1->id,
            ])
            ->assertJsonMissing([
                'id' => $partage2->id,
            ]);
    }

    public function test_can_store_ressource_partage(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $user = User::factory()->create(['actif' => 1]);
        $ressource = Ressource::factory()->create();

        $payload = [
            'ressource_id' => $ressource->id,
            'email_destinataire' => $user->email,
        ];

        // Act
        $response = $this->postJson('/api/ressource_partages', $payload);

        // Assert
        $response->assertStatus(201)
            ->assertJson([
                'status' => true,
                'message' => 'Partage de ressouce ajouté avec succès',
            ]);

        $this->assertDatabaseHas('ressource_partages', [
            'ressource_id' => $ressource->id,
            'user_id' => $user->id,
        ]);
    }

    public function test_cannot_store_partage_with_nonexistent_user(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $ressource = Ressource::factory()->create();

        $payload = [
            'ressource_id' => $ressource->id,
            'email_destinataire' => 'inexistant@mail.com',
        ];

        // Act
        $response = $this->postJson('/api/ressource_partages', $payload);

        // Assert
        $response->assertStatus(422);
    }

    public function test_cannot_store_partage_for_inactive_user(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $user = User::factory()->create(['actif' => 0]);
        $ressource = Ressource::factory()->create();

        $payload = [
            'ressource_id' => $ressource->id,
            'email_destinataire' => $user->email,
        ];

        // Act
        $response = $this->postJson('/api/ressource_partages', $payload);

        // Assert
        $response->assertStatus(404)
            ->assertJson([
                'status' => false,
                'message' => 'Aucun utilisateur trouvé avec cet email.',
            ]);
    }

    public function test_can_delete_ressource_partage(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $ressourcePartage = RessourcePartage::factory()->create();

        // Act
        $response = $this->deleteJson('/api/ressource_partages/' . $ressourcePartage->id);

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Partage de ressource supprimé avec succès',
            ]);

        $this->assertDatabaseMissing('ressource_partages', [
            'id' => $ressourcePartage->id,
        ]);
    }
}
