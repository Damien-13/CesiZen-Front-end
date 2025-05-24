<?php

namespace Database\Seeders;

use App\Models\RelationType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RelationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $relationTypes = [
            ['lib_relation_type' => 'Amitié', 'visible' => true],
            ['lib_relation_type' => 'Parent-Enfant', 'visible' => true],
            ['lib_relation_type' => 'Fratrie', 'visible' => true],
            ['lib_relation_type' => 'Relation amoureuse', 'visible' => true],
            ['lib_relation_type' => 'Couple', 'visible' => true],
            ['lib_relation_type' => 'Colocataire', 'visible' => true],
            ['lib_relation_type' => 'Voisinage', 'visible' => true],
            ['lib_relation_type' => 'Aidant familial', 'visible' => true],
            ['lib_relation_type' => 'Enseignant·e ou formateur·rice', 'visible' => true],
            ['lib_relation_type' => 'Professionnel de santé', 'visible' => true],
            ['lib_relation_type' => 'Accompagnant social', 'visible' => true],
        ];

        foreach ($relationTypes as $relationType) {
            RelationType::create($relationType);
        }
    }
}
