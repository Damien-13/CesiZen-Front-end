<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RessourceCategorie extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'lib_ressource_categorie',
        'visible'
    ];

    public function ressources(): HasMany {
        return $this->hasMany(Ressource::class);
    }
}
