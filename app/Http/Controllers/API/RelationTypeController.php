<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\RelationType;
use Illuminate\Http\Request;

class RelationTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RelationType::orderBy('lib_relation_type');

        //Paramètres optionnels
        if ($request->has('visible')) {
            $visible = filter_var($request->query('visible'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if ($visible !== null) {
                $query->where('visible', $visible);
            }
        }

        $relationTypes = $query->get();

        return response()->json([
            'status' => true,
            'message' => 'Liste des types de relation récupérée avec succès',
            'data' => $relationTypes
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lib_relation_type' => 'required|string|max:100',
            'visible' => 'required|boolean',
        ]);

        $relationType = RelationType::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Type de relation ajouté avec succès',
            'data' => $relationType
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RelationType $relationtype)
    {
        return response()->json([
            'status' => true,
            'message' => 'Type de relation trouvé avec succès',
            'data' => $relationtype
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RelationType $relationType)
    {
        $validated = $request->validate([
            'lib_relation_type' => 'required|string|max:100',
            'visible' => 'required|boolean',
        ]);

        $relationType->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Type de relation modifié avec succès',
            'data' => $relationType
        ], 200);
    }

    /**
     * Remove the specified resource from storage. 
     */
    public function destroy($id)
    {
        // Vérifier si ressource utilise ce type de relation
        $relationType = RelationType::find($id);
        if ($relationType) {
            if ($relationType->ressources()->exists()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Ce type de relation ne peut être supprimé : il est utilisé par une ressource.'
                ], 400);
            } else {
                $relationType->delete();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Type de relation supprimé avec succès'
        ], 200);
    }
}
