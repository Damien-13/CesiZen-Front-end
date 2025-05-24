<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Super-administrateur'],
            ['name' => 'Administrateur'],
            ['name' => 'Modérateur'],
            ['name' => 'Citoyen']
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
