<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $regions = Region::all();

        return response()->json([
            'status' => true,
            'message' => 'Liste des régions récupérée avec succès',
            'data' => $regions
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Region $region)
    {
        $region->load('departements');

        return response()->json([
            'status' => true,
            'message' => 'Région trouvée avec succès',
            'data' => $region
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Region $region)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Region $region)
    {
        //
    }
}
