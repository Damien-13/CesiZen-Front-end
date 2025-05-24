<?php

namespace Tests\Unit;

use App\Models\RelationType;
use App\Models\Ressource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RelationTypeTest extends TestCase
{
    use RefreshDatabase;

    public function test_ressource_categorie_belongs_to_many_ressources(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $relation_type = RelationType::factory()->create();
        Ressource::factory()->count(1)->create([
            'relation_type_id' => $relation_type->id,
        ]);

        // Act
        $ressources = $relation_type->ressources;

        // Assert
        $this->assertCount(1, $ressources);
        $this->assertInstanceOf(Ressource::class, $ressources->first());
    }
}
