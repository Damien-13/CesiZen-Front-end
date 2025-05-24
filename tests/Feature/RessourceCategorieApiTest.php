<?php

namespace Tests\Feature;

use App\Models\Ressource;
use App\Models\RessourceCategorie;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RessourceCategorieApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_ressource_categories(): void
    {
        //Arrange
        RessourceCategorie::factory()->count(3)->create();

        //Act
        $response = $this->getJson('/api/ressource_categories');

        //Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    '*' => ['id', 'lib_ressource_categorie', 'visible', 'created_at', 'updated_at']
                ]
            ]);
    }

    public function test_can_list_by_visible(): void
    {
        //Arrange
        RessourceCategorie::factory()->create(['visible' => true]);
        RessourceCategorie::factory()->create(['visible' => false]);

        //Act
        $response = $this->getJson('/api/ressource_categories?visible=true');

        //Assert
        $response->assertStatus(200)
            ->assertJsonFragment(['visible' => 1])
            ->assertJsonMissing(['visible' => 0]);
    }

    public function test_can_store_ressource_categorie(): void
    {
        //Arrange
        $payload = [
            'lib_ressource_categorie' => 'Images',
            'visible' => true,
        ];

        //Act
        $response = $this->postJson('/api/ressource_categories', $payload);

        //Assert
        $response->assertStatus(201)
            ->assertJson([
                'status' => true,
                'message' => 'Catégorie de ressource ajoutée avec succès',
                'data' => [
                    'lib_ressource_categorie' => 'Images',
                    'visible' => 1,
                ]
            ]);

        $this->assertDatabaseHas('ressource_categories', [
            'lib_ressource_categorie' => 'Images',
            'visible' => 1,
        ]);
    }

    public function test_can_show_ressource_categorie(): void
    {
        //Arrange
        $categorie = RessourceCategorie::factory()->create([
            'lib_ressource_categorie' => 'PDF',
            'visible' => true,
        ]);

        //Act
        $response = $this->getJson("/api/ressource_categories/{$categorie->id}");

        //Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Catégorie de ressource trouvée avec succès',
            ])
            ->assertJsonStructure([
                'data'
            ]);
    }

    public function test_can_update_ressource_categorie(): void
    {
        //Arrange
        $categorie = RessourceCategorie::factory()->create([
            'lib_ressource_categorie' => 'Video',
            'visible' => true,
        ]);

        $payload = [
            'lib_ressource_categorie' => 'Video Updated',
            'visible' => false,
        ];

        //Act
        $response = $this->putJson("/api/ressource_categories/{$categorie->id}", $payload);

        //Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Catégorie de ressource modifiée avec succès',
                'data' => [
                    'id' => $categorie->id,
                    'lib_ressource_categorie' => 'Video Updated',
                    'visible' => 0,
                ]
            ]);

        $this->assertDatabaseHas('ressource_categories', [
            'id' => $categorie->id,
            'lib_ressource_categorie' => 'Video Updated',
            'visible' => 0,
        ]);
    }

    public function test_can_delete_ressource_categorie(): void
    {
        //Arrange
        $categorie = RessourceCategorie::factory()->create();

        //Act
        $response = $this->deleteJson("/api/ressource_categories/{$categorie->id}");

        //Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Catégorie de ressource supprimée avec succès',
            ]);

        $this->assertDatabaseMissing('ressource_categories', [
            'id' => $categorie->id,
        ]);
    }

    public function test_cannot_delete_categorie_with_ressource(): void
    {
        //Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $categorie = RessourceCategorie::factory()->create();
        Ressource::factory()->create(['ressource_categorie_id' => $categorie->id]);

        //Act
        $response = $this->deleteJson("/api/ressource_categories/{$categorie->id}");

        //Assert
        $response->assertStatus(400)
            ->assertJson([
                'status' => false,
                'message' => 'Cette catégorie ne peut être supprimée : elle est utilisée par une ressource.',
            ]);

        $this->assertDatabaseHas('ressource_categories', [
            'id' => $categorie->id,
        ]);
    }
}
