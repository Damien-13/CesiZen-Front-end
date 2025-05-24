<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Region extends Model
{
    protected $fillable = ['lib_region'];

    public function departements(): HasMany
    {
        return $this->hasMany(Departement::class);
    }
}
