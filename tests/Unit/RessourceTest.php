<?php

namespace Tests\Unit;

use App\Models\RelationType;
use App\Models\Ressource;
use App\Models\RessourceCategorie;
use App\Models\RessourceType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RessourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_ressource_belong_relations(): void
    {
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        
        // Arrange
        $user = User::factory()->create();
        $categorie = RessourceCategorie::factory()->create();
        $type = RessourceType::factory()->create();
        $relation = RelationType::factory()->create();
        $ressource = Ressource::factory()->create([
            'user_id' => $user->id,
            'ressource_categorie_id' => $categorie->id,
            'ressource_type_id' => $type->id,
            'relation_type_id' => $relation->id,
        ]);

        // Act & Assert : vérifier chaque relation

        // User
        $this->assertInstanceOf(User::class, $ressource->user);
        $this->assertEquals($user->id, $ressource->user->id);

        // RessourceCategorie
        $this->assertInstanceOf(RessourceCategorie::class, $ressource->ressourceCategorie);
        $this->assertEquals($categorie->id, $ressource->ressourceCategorie->id);

        // RessourceType
        $this->assertInstanceOf(RessourceType::class, $ressource->ressourceType);
        $this->assertEquals($type->id, $ressource->ressourceType->id);

        // RelationType
        $this->assertInstanceOf(RelationType::class, $ressource->relationType);
        $this->assertEquals($relation->id, $ressource->relationType->id);
    }
}
