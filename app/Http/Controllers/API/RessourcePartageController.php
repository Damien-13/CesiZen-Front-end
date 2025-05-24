<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\RessourcePartage;
use App\Models\User;
use Illuminate\Http\Request;

class RessourcePartageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RessourcePartage::with(['destinataire', 'ressource'])
            ->join('users', 'ressource_partages.user_id', '=', 'users.id')
            ->where('users.actif', 1)
            ->orderBy('users.nom')
            ->orderBy('users.prenom')
            ->orderBy('users.email')
            ->select('ressource_partages.*');

        if ($request->has('ressource_id')) {
            $query->where('ressource_id', $request->query('ressource_id'));
        }

        $ressourcePartages = $query->get();

        return response()->json([
            'status' => true,
            'message' => 'Liste des ressources récupérée avec succès',
            'data' => $ressourcePartages
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ressource_id' => 'required|exists:ressources,id',
            'email_destinataire' => 'required|email|exists:users,email',
        ]);

        //Vérifie si utilisateur existe
        $user = User::where('email', $validated['email_destinataire'])
            ->where('actif', 1)
            ->first();
            
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Aucun utilisateur trouvé avec cet email.',
            ], 404);
        }

        $ressourcePartage = RessourcePartage::create([
            'ressource_id' => $validated['ressource_id'],
            'user_id' => $user->id
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Partage de ressouce ajouté avec succès',
            'data' => $ressourcePartage
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RessourcePartage $ressourcePartage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RessourcePartage $ressourcePartage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RessourcePartage $ressourcePartage)
    {
        $ressourcePartage->delete();

        return response()->json([
            'status' => true,
            'message' => 'Partage de ressource supprimé avec succès'
        ], 200);
    }
}
