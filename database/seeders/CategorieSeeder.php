<?php

namespace Database\Seeders;

use App\Models\RessourceCategorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['lib_ressource_categorie' => 'Social', 'visible' => true],
            ['lib_ressource_categorie' => 'Santé', 'visible' => true],
            ['lib_ressource_categorie' => 'Éducation', 'visible' => true],
            ['lib_ressource_categorie' => 'Emploi et insertion', 'visible' => true],
            ['lib_ressource_categorie' => 'Logement', 'visible' => true],
            ['lib_ressource_categorie' => 'Mobilité', 'visible' => true],
            ['lib_ressource_categorie' => 'Accès aux droits', 'visible' => true],
            ['lib_ressource_categorie' => 'Culture et loisirs', 'visible' => true],
            ['lib_ressource_categorie' => 'Vie de famille', 'visible' => true],        
            ['lib_ressource_categorie' => 'Lien social et entraide', 'visible' => true],
        ];

        foreach ($categories as $categorie) {
            RessourceCategorie::create($categorie);
        }
    }
}
