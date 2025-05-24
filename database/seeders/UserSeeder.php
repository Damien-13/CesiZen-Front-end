<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::pluck('id', 'name');

        $users = [
            ['nom' => 'DURAND', 'prenom' => 'Alice', 'email' => 'alice@admin.fr', 'role' => 'Super-administrateur', 'code_postal' => '75001', 'ville' => 'Paris'],
            ['nom' => 'MARTIN', 'prenom' => 'Jean', 'email' => 'jean@moderateur.fr', 'role' => 'Modérateur', 'code_postal' => '69003', 'ville' => 'Lyon'],
            ['nom' => 'DUPONT', 'prenom' => 'Emma', 'email' => 'emma@citoyen.fr', 'role' => 'Citoyen', 'code_postal' => '13001', 'ville' => 'Marseille'],
            ['nom' => 'BERANRD', 'prenom' => 'Lucie', 'email' => 'lucie@citoyen.fr', 'role' => 'Citoyen', 'code_postal' => '31000', 'ville' => 'Toulouse'],
            ['nom' => 'NOEL', 'prenom' => 'Samuel', 'email' => 'samuel@admin.fr', 'role' => 'Administrateur', 'code_postal' => '44000', 'ville' => 'Nantes'],
            ['nom' => 'PETIT', 'prenom' => 'Clara', 'email' => 'clara@citoyen.fr', 'role' => 'Citoyen', 'code_postal' => '35000', 'ville' => 'Rennes'],
            ['nom' => 'LEMOINE', 'prenom' => 'David', 'email' => 'david@citoyen.fr', 'role' => 'Citoyen', 'code_postal' => '67000', 'ville' => 'Strasbourg'],
            ['nom' => 'BENOIT', 'prenom' => 'Sarah', 'email' => 'sarah@citoyen.fr', 'role' => 'Citoyen', 'code_postal' => '21000', 'ville' => 'Dijon'],
            ['nom' => 'ROBERT', 'prenom' => 'Thomas', 'email' => 'thomas@citoyen.fr', 'role' => 'Citoyen', 'code_postal' => '59000', 'ville' => 'Lille'],
            ['nom' => 'COLIN', 'prenom' => 'Isabelle', 'email' => 'isabelle@admin.fr', 'role' => 'Administrateur', 'code_postal' => '38000', 'ville' => 'Grenoble'],
        ];
        foreach ($users as $data) {
            User::create([
                'nom' => $data['nom'],
                'prenom' => $data['prenom'],
                'email' => $data['email'],
                'email_verified_at' => now(),
                'password' => 'Password%13',
                'pseudo' => Str::slug($data['prenom']) . rand(10, 99),
                'code_postal' => $data['code_postal'],
                'ville' => $data['ville'],
                'actif' => true,
                'role_id' => $roles[$data['role']]
            ]);
        }
    }
}
