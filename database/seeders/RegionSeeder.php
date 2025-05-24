<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = [
            ['id' => 1, 'lib_region' => 'Auvergne-Rhône-Alpes'],
            ['id' => 2, 'lib_region' => 'Bourgogne-Franche-Comté'],
            ['id' => 3, 'lib_region' => 'Bretagne'],
            ['id' => 4, 'lib_region' => 'Centre-Val de Loire'],
            ['id' => 5, 'lib_region' => 'Corse'],
            ['id' => 6, 'lib_region' => 'Grand Est'],
            ['id' => 7, 'lib_region' => 'Hauts-de-France'],
            ['id' => 8, 'lib_region' => 'Île-de-France'],
            ['id' => 9, 'lib_region' => 'Normandie'],
            ['id' => 10, 'lib_region' => 'Nouvelle-Aquitaine'],
            ['id' => 11, 'lib_region' => 'Occitanie'],
            ['id' => 12, 'lib_region' => 'Pays de la Loire'],
            ['id' => 13, 'lib_region' => "Provence-Alpes-Côte d'Azur"],
            ['id' => 14, 'lib_region' => 'Guadeloupe'],
            ['id' => 15, 'lib_region' => 'Martinique'],
            ['id' => 16, 'lib_region' => 'Guyane'],
            ['id' => 17, 'lib_region' => 'La Réunion'],
            ['id' => 18, 'lib_region' => 'Mayotte'],
        ];

        foreach ($regions as $region) {
            Region::create($region);
        }
    }
}
