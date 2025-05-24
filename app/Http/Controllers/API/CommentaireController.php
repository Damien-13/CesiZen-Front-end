<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Commentaire;
use Illuminate\Http\Request;

class CommentaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $commentaires = Commentaire::with(['user', 'ressource', 'reponses'])->get();

        return response()->json([
            'status' => true,
            'message' => 'Liste des commentaires récupérée avec succès',
            'data' => $commentaires
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lib_commentaire' => 'required|string|max:500',
            'visible' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
            'ressource_id' => 'required|exists:ressources,id',
            'parent_id' => 'nullable|exists:commentaires,id',
        ]);

        $commentaire = Commentaire::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Commentaire ajouté avec succès',
            'data' => $commentaire
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Commentaire $commentaire)
    {
        $commentaire->load(['user', 'ressource', 'reponses']);

        return response()->json([
            'status' => true,
            'message' => 'Commentaire trouvé avec succès',
            'data' => $commentaire
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commentaire $commentaire)
    {
        $validated = $request->validate([
            'lib_commentaire' => 'required|string|max:500',
            'visible' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
            'ressource_id' => 'required|exists:ressources,id',
            'parent_id' => 'nullable|exists:commentaires,id',
        ]);

        $commentaire->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Commentaire modifié avec succès',
            'data' => $commentaire
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commentaire $commentaire)
    {
        $commentaire->delete();

        return response()->json([
            'status' => true,
            'message' => 'Commentaire supprimé avec succès'
        ], 200);
    }
}
