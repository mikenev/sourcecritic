<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    public $incrementing = false;
    
    public function users()
    {
        return $this->belongsToMany('App\User');
    }
    
    public function files()
    {
        return $this->hasMany('App\File', 'review_id', 'id');
    }
}
