<?php

namespace Tests\Feature;

use App\Models\RelationType;
use App\Models\Ressource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RelationTypeApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_relation_types(): void
    {
        //Arrange
        RelationType::factory()->count(3)->create();

        //Act
        $response = $this->getJson('/api/relation_types');

        //Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    '*' => ['id', 'lib_relation_type', 'visible', 'created_at', 'updated_at']
                ]
            ]);
    }

    public function test_can_list_relation_type_by_visible(): void
    {
        //Arrange
        RelationType::factory()->create(['visible' => true]);
        RelationType::factory()->create(['visible' => false]);

        //Act
        $response = $this->getJson('/api/relation_types?visible=true');

        //Assert
        $response->assertStatus(200)
            ->assertJsonFragment(['visible' => 1])
            ->assertJsonMissing(['visible' => 0]);
    }

    public function test_can_store_relation_type(): void
    {
        //Arrange
        $payload = [
            'lib_relation_type' => 'Amitié',
            'visible' => true,
        ];

        //Act
        $response = $this->postJson('/api/relation_types', $payload);

        //Assert
        $response->assertStatus(201)
            ->assertJson([
                'status' => true,
                'message' => 'Type de relation ajouté avec succès',
                'data' => [
                    'lib_relation_type' => 'Amitié',
                    'visible' => 1,
                ]
            ]);

        $this->assertDatabaseHas('relation_types', [
            'lib_relation_type' => 'Amitié',
            'visible' => 1,
        ]);
    }

    public function test_can_show_relation_type(): void
    {
        //Arrange
        $typeRelation = RelationType::factory()->create([
            'lib_relation_type' => 'Famille',
            'visible' => true,
        ]);

        //Act
        $response = $this->getJson("/api/relation_types/{$typeRelation->id}");

        //Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Type de relation trouvé avec succès',
            ])
            ->assertJsonStructure([
                'data'
            ]);
    }

    public function test_can_update_relation_type(): void
    {
        //Arrange
        $typeRelation = RelationType::factory()->create([
            'lib_relation_type' => 'Voisinage',
            'visible' => true,
        ]);

        $payload = [
            'lib_relation_type' => 'Voisinage updated',
            'visible' => false,
        ];

        //Act
        $response = $this->putJson("/api/relation_types/{$typeRelation->id}", $payload);

        //Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Type de relation modifié avec succès',
                'data' => [
                    'id' => $typeRelation->id,
                    'lib_relation_type' => 'Voisinage updated',
                    'visible' => 0,
                ]
            ]);

        $this->assertDatabaseHas('relation_types', [
            'id' => $typeRelation->id,
            'lib_relation_type' => 'Voisinage updated',
            'visible' => 0,
        ]);
    }

    public function test_can_delete_relation_type(): void
    {
        //Arrange
        $relationType = RelationType::factory()->create();

        //Act
        $response = $this->deleteJson("/api/relation_types/{$relationType->id}");

        //Assert
        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Type de relation supprimé avec succès',
            ]);

        $this->assertDatabaseMissing('relation_types', [
            'id' => $relationType->id,
        ]);
    }

    public function test_cannot_delete_relation_type_with_ressource(): void
    {
        //Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $typeRelation = RelationType::factory()->create();
        Ressource::factory()->create(['relation_type_id' => $typeRelation->id]);

        //Act
        $response = $this->deleteJson("/api/relation_types/{$typeRelation->id}");

        //Assert
        $response->assertStatus(400)
            ->assertJson([
                'status' => false,
                'message' => 'Ce type de relation ne peut être supprimé : il est utilisé par une ressource.',
            ]);

        $this->assertDatabaseHas('relation_types', [
            'id' => $typeRelation->id,
        ]);
    }
}
