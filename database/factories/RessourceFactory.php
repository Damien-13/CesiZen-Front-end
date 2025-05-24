<?php

namespace Database\Factories;

use App\Models\RelationType;
use App\Models\RessourceCategorie;
use App\Models\RessourceType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ressource>
 */
class RessourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titre' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'nom_fichier' => $this->faker->word . '.pdf',
            'restreint' => $this->faker->boolean,
            'url' => $this->faker->url,
            'valide' => $this->faker->boolean,

            'user_id' => User::factory(),
            'ressource_categorie_id' => RessourceCategorie::factory(),
            'ressource_type_id' => RessourceType::factory(),
            'relation_type_id' => RelationType::factory(),
        ];
    }
}
