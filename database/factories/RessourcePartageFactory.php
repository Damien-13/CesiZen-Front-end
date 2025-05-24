<?php

namespace Database\Factories;

use App\Models\Ressource;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RessourcePartage>
 */
class RessourcePartageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ressource_id' => Ressource::factory(),
            'user_id' => User::factory(),
        ];
    }
}
