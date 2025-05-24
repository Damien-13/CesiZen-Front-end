<?php

namespace Tests\Feature;

use App\Models\RelationType;
use App\Models\Ressource;
use App\Models\RessourceCategorie;
use App\Models\RessourceType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RessourceApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_ressources(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        Ressource::factory()->count(3)->create();

        // Act
        $response = $this->getJson('/api/ressources');

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Liste des ressources récupérée avec succès',
            ])
            ->assertJsonCount(3, 'data');
    }

    public function test_can_filter_ressources_by_valide(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        Ressource::factory()->create(['valide' => true]);
        Ressource::factory()->create(['valide' => false]);

        // Act
        $response = $this->getJson('/api/ressources?valide=true');

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Liste des ressources récupérée avec succès',
            ])
            ->assertJsonFragment(['valide' => 1])
            ->assertJsonMissing(['valide' => 0]);
    }

    public function test_can_store_ressource(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $user = User::factory()->create();
        $categorie = RessourceCategorie::factory()->create();
        $type = RessourceType::factory()->create();
        $relation = RelationType::factory()->create();

        $payload = [
            'titre' => 'Test titre',
            'description' => 'Description de test',
            'nom_fichier' => 'test.pdf',
            'restreint' => false,
            'url' => 'https://test.com',
            'valide' => true,
            'user_id' => $user->id,
            'ressource_categorie_id' => $categorie->id,
            'ressource_type_id' => $type->id,
            'relation_type_id' => $relation->id,
        ];

        // Act
        $response = $this->postJson('/api/ressources', $payload);

        // Assert
        $response->assertStatus(201)
            ->assertJson([
                'status' => true,
                'message' => 'Ressource ajoutée avec succès',
                'data' => [
                    'titre' => 'Test titre',
                ],
            ]);

        $this->assertDatabaseHas('ressources', [
            'titre' => 'Test titre',
        ]);
    }

    public function test_can_show_ressource(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $ressource = Ressource::factory()->create();

        // Act
        $response = $this->getJson("/api/ressources/{$ressource->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Ressource trouvée avec succès',
                'data' => [
                    'id' => $ressource->id,
                ],
            ]);
    }

    public function test_can_update_ressource(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $ressource = Ressource::factory()->create();
        $user = User::factory()->create();
        $categorie = RessourceCategorie::factory()->create();
        $type = RessourceType::factory()->create();
        $relation = RelationType::factory()->create();

        $payload = [
            'titre' => 'Titre modifié',
            'description' => 'Description modifiée',
            'nom_fichier' => 'updated.pdf',
            'restreint' => true,
            'url' => 'https://updated.com',
            'valide' => false,
            'user_id' => $user->id,
            'ressource_categorie_id' => $categorie->id,
            'ressource_type_id' => $type->id,
            'relation_type_id' => $relation->id,
        ];

        // Act
        $response = $this->putJson("/api/ressources/{$ressource->id}", $payload);

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Ressource modifiée avec succès',
                'data' => [
                    'titre' => 'Titre modifié',
                ],
            ]);

        $this->assertDatabaseHas('ressources', [
            'id' => $ressource->id,
            'titre' => 'Titre modifié',
        ]);
    }

    public function test_can_delete_ressource(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $ressource = Ressource::factory()->create();

        // Act
        $response = $this->deleteJson("/api/ressources/{$ressource->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Ressource supprimée avec succès',
            ]);

        $this->assertDatabaseMissing('ressources', [
            'id' => $ressource->id,
        ]);
    }
}
