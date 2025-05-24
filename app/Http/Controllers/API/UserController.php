<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderBy('nom')->orderBy('prenom')->get();

        return response()->json([
            'status' => true,
            'message' => 'Liste des utilisateurs récupérée avec succès',
            'data' => $users
        ], 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des données ------------------------
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|string|max:100',
            'password' => 'required|string|max:255',
            'pseudo' => 'nullable|string|max:100',
            'code_postal' => 'nullable|string|max:100',
            'ville' => 'nullable|string|max:100',
            'actif' => 'required|boolean',
            'role_id' => 'nullable|integer|exists:roles,id'
        ]);
         
         // Si l'utilisateur n'est pas connecté, on force le rôle citoyen (4)
if (!Auth::check()) {
    $validated['role_id'] = 4;
} else {
    // L'utilisateur est connecté → on récupère le rôle demandé (ou citoyen par défaut)
    $roleId = $validated['role_id'] ?? 4;

    // Si l'utilisateur connecté veut créer autre chose qu'un citoyen, il doit être superadmin
    if ($roleId !== 4 && Auth::user()->role_id !== 1) {
        return response()->json([
            'status' => false,
            'message' => 'Seul un superadmin peut attribuer un rôle différent de citoyen.'
        ], 403);
    }

    // Sinon, on valide le rôle demandé (1, 2, 3 ou 4)
    $validated['role_id'] = $roleId;
}

        // Créer l'utilisateur ------------------------
        $user = User::create($validated);
    
        return response()->json([
            'status' => true,
            'message' => 'Utilisateur ajouté avec succès',
            'data' => $user
        ], 201);
    }

        public function toggleActif($id)
    {
        $admin = Auth::user();

        // Vérifie que seul un administrateur peut faire ça
        if ($admin->role_id !== 1) {
            return response()->json([
                'status' => false,
                'message' => 'Seul un administrateur peut modifier l’état des comptes.'
            ], 403);
        }

        $user = User::findOrFail($id);

        // Inverser le booléen actif
        $user->actif = !$user->actif;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Utilisateur ' . ($user->actif ? 'activé' : 'désactivé') . ' avec succès.',
            'data' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'actif' => $user->actif
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json([
            'status' => true,
            'message' => 'Utilisateur trouvé avec succès',
            'data' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */

    public function updateSelf(Request $request)
{
    $user = Auth::user();
    //On vérifie uniquement si le champ est renseigné.
    $validated = $request->validate([
        'nom' => 'sometimes|string|max:100',
        'prenom' => 'sometimes|string|max:100',
        'email' => 'sometimes|email|max:100',
        'password' => 'sometimes|string|min:8|confirmed',
        'pseudo' => 'sometimes|string|max:100',
        'code_postal' => 'sometimes|string|max:100',
        'ville' => 'sometimes|string|max:100',
    ]);
     //Si le password est modifié, on lâche avant de le remplacer.
    if (isset($validated['password'])) {
        $validated['password'] = Hash::make($validated['password']);
    }

    $user->update($validated);

    return response()->json([
        'status' => true,
        'message' => 'Informations mises à jour avec succès',
        'data' => $user
    ]);
}
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'Utilisateur supprimé avec succès'
        ], 200);
    }
}
