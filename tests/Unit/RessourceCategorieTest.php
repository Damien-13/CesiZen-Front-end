<?php

namespace Tests\Unit;

use App\Models\Ressource;
use App\Models\RessourceCategorie;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RessourceCategorieTest extends TestCase
{
    use RefreshDatabase;

    public function test_ressource_categorie_belongs_to_many_ressources(): void
    {
        // Arrange
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $categorie = RessourceCategorie::factory()->create();
        Ressource::factory()->count(3)->create([
            'ressource_categorie_id' => $categorie->id,
        ]);

        // Act
        $ressources = $categorie->ressources;

        // Assert
        $this->assertCount(3, $ressources);
        $this->assertInstanceOf(Ressource::class, $ressources->first());
    }
}
