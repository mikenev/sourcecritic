<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function reviews()
    {
        return $this->belongsToMany('App\Review');
    }
}
