<?php

namespace Database\Seeders;

use App\Models\RessourceType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RessourceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RessourceType::create([
            'lib_ressource_type' => 'texte',
            'visible' => true
        ]);
    }
}
