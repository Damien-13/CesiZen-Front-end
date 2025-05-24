<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ressource extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'nom_fichier',
        'restreint',
        'url',
        'valide',
        'user_id',
        'ressource_categorie_id',
        'ressource_type_id',
        'relation_type_id'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function ressourceCategorie(): BelongsTo
    {
        return $this->belongsTo(RessourceCategorie::class);
    }

    public function ressourceType(): BelongsTo
    {
        return $this->belongsTo(RessourceType::class);
    }

    public function relationType(): BelongsTo
    {
        return $this->belongsTo(RelationType::class);
    }
}
