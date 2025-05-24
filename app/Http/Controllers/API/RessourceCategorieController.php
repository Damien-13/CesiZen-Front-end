<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\RessourceCategorie;
use Illuminate\Http\Request;

class RessourceCategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RessourceCategorie::orderBy('lib_ressource_categorie');

        //Paramètres optionnels
        if ($request->has('visible')) {
            $visible = filter_var($request->query('visible'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE); //CAST en booléen
            if ($visible !== null) {
                $query->where('visible', $visible);
            }
        }

        $ressourceCategories = $query->get();

        return response()->json([
            'status' => true,
            'message' => 'Liste des catégories de ressource récupérée avec succès',
            'data' => $ressourceCategories
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lib_ressource_categorie' => 'required|string|max:50',
            'visible' => 'required|boolean',
        ]);

        $ressourceCategorie = RessourceCategorie::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Catégorie de ressource ajoutée avec succès',
            'data' => $ressourceCategorie
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RessourceCategorie $ressourceCategorie)
    {
        return response()->json([
            'status' => true,
            'message' => 'Catégorie de ressource trouvée avec succès',
            'data' => $ressourceCategorie
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $ressourceCategorie = RessourceCategorie::find($id);

        if ($ressourceCategorie) {
            // Validation des données
            $validated = $request->validate([
                'lib_ressource_categorie' => 'required|string|max:100',
                'visible' => 'required|boolean',
            ]);

            // Mise à jour de la ressource
            $ressourceCategorie->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'Catégorie de ressource modifiée avec succès',
                'data' => $ressourceCategorie
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Vérifier si ressource utilise cette catégorie
        $ressourceCategorie = RessourceCategorie::find($id);
        if ($ressourceCategorie) {
            if ($ressourceCategorie->ressources()->exists()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Cette catégorie ne peut être supprimée : elle est utilisée par une ressource.'
                ], 400);
            } else {
                $ressourceCategorie->delete();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Catégorie de ressource supprimée avec succès'
        ], 200);
    }
}
