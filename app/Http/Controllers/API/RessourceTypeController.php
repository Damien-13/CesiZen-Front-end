<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\RessourceType;
use Illuminate\Http\Request;

class RessourceTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ressourceTypes = RessourceType::orderBy('lib_ressource_type')->get();

        return response()->json([
            'status' => true,
            'message' => 'Liste des types de ressource récupérée avec succès',
            'data' => $ressourceTypes
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lib_ressource_type' => 'required|string|max:100',
            'visible' => 'required|boolean',
        ]);

        $ressourcetype = RessourceType::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Type de ressource ajouté avec succès',
            'data' => $ressourcetype
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RessourceType $ressourcetype)
    {
        return response()->json([
            'status' => true,
            'message' => 'Type de ressource trouvé avec succès',
            'data' => $ressourcetype
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RessourceType $ressourceType)
    {
        $validated = $request->validate([
            'lib_ressource_type' => 'required|string|max:100',
            'visible' => 'required|boolean',
        ]);

        $ressourceType->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Type de ressource modifié avec succès',
            'data' => $ressourceType
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RessourceType $ressourceType)
    {
        $ressourceType->delete();

        return response()->json([
            'status' => true,
            'message' => 'Type de ressource supprimé avec succès'
        ], 200);
    }
}
