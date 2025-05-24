<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::with(['user', 'reponses'])->get();

        return response()->json([
            'status' => true,
            'message' => 'Liste des messages récupérée avec succès',
            'data' => $messages
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lib_message' => 'required|string|max:500',
            'user_id' => 'required|exists:users,id',
            'ressource_id' => 'required|exists:ressources,id',
            'parent_id' => 'nullable|exists:commentaires,id',
        ]);

        $message = Message::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Message ajouté avec succès',
            'data' => $message
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        $message->load(['user', 'ressource', 'reponses']);

        return response()->json([
            'status' => true,
            'message' => 'Message trouvé avec succès',
            'data' => $message
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        $validated = $request->validate([
            'lib_message' => 'required|string|max:500',
            'user_id' => 'required|exists:users,id',
            'ressource_id' => 'required|exists:ressources,id',
            'parent_id' => 'nullable|exists:commentaires,id',
        ]);

        $message->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Message modifié avec succès',
            'data' => $message
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $message->delete();

        return response()->json([
            'status' => true,
            'message' => 'Message supprimé avec succès'
        ], 200);
    }
}
