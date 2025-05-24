<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ressource;
use App\Models\RessourcePartage;
use App\Models\User;
use Illuminate\Http\Request;

class RessourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Ressource::with(['user', 'ressourceType', 'ressourceCategorie', 'relationType'])
            ->orderBy('created_at', 'desc');

        // Filtre optionnel : "valide"
        if ($request->has('valide')) {
            $valide = filter_var($request->query('valide'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if ($valide !== null) {
                $query->where('valide', $valide);
            }
        }

        if ($request->has('catalogue')) {
            $userId = (int) ($request->query('user_id') ?? 0);
            $isAdmin = false;
            if ($userId === 0) {
                // user_id = 0 = uniquement les restreintes
                $query->where('restreint', false);
            } else {
                // Vérifier le rôle de l'utilisateur
                $user = User::find($userId);
                $isAdmin = $user && in_array($user->role_id, [1, 2]);

                if ($isAdmin) {
                    // aucun filtre
                } else {
                    // Utilisateur = publiques + personnelles + partagées
                    $ressourcesPartageesIds = RessourcePartage::where('user_id', $userId)
                        ->pluck('ressource_id');

                    $query->where(function ($q) use ($userId, $ressourcesPartageesIds) {
                        $q->where('restreint', false)
                            ->orWhere('user_id', $userId)
                            ->orWhereIn('id', $ressourcesPartageesIds);
                    });
                }
            }
        }

        $ressources = $query->get();

        return response()->json([
            'status' => true,
            'message' => 'Liste des ressources récupérée avec succès',
            'data' => $ressources
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:100',
            'description' => 'required|string|max:500',
            'nom_fichier' => 'nullable|string|max:255',
            'restreint' => 'required|boolean',
            'url' => 'nullable|string|max:255',
            'valide' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
            'ressource_categorie_id' => 'required|exists:ressource_categories,id',
            'ressource_type_id' => 'required|exists:ressource_types,id',
            'relation_type_id' => 'required|exists:relation_types,id'
        ]);

        $ressource = Ressource::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Ressource ajoutée avec succès',
            'data' => $ressource
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ressource $ressource)
    {
        $ressource->load(['user', 'ressourceType', 'ressourceCategorie', 'relationType']);

        return response()->json([
            'status' => true,
            'message' => 'Ressource trouvée avec succès',
            'data' => $ressource
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ressource $ressource)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:100',
            'description' => 'required|string|max:500',
            'nom_fichier' => 'nullable|string|max:255',
            'restreint' => 'required|boolean',
            'url' => 'nullable|string|max:255',
            'valide' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
            'ressource_categorie_id' => 'required|exists:ressource_categories,id',
            'ressource_type_id' => 'required|exists:ressource_types,id',
            'relation_type_id' => 'required|exists:relation_types,id'
        ]);

        $ressource->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Ressource modifiée avec succès',
            'data' => $ressource
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ressource $ressource)
    {
        $ressource->delete();

        return response()->json([
            'status' => true,
            'message' => 'Ressource supprimée avec succès'
        ], 200);
    }
}
