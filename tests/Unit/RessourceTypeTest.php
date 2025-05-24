<?php

namespace Tests\Unit;

use App\Models\Ressource;
use App\Models\RessourceType;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RessourceTypeTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_ressource_type_belongs_to_many_ressources(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $type = RessourceType::factory()->create();
        Ressource::factory()->count(2)->create([
            'ressource_type_id' => $type->id,
        ]);

        // Act
        $ressources = $type->ressources;

        // Assert
        $this->assertCount(2, $ressources);
        $this->assertInstanceOf(Ressource::class, $ressources->first());
    }
}
