<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::where('id', '<', 4)->get();

        return response()->json([
            'status' => true,
            'message' => 'Liste des rôles récupérée avec succès',
            'data' => $roles
        ], 200);
    }
}
