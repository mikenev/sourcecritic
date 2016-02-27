<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    public function comments()
    {
        return $this->hasMany('Comment');
    }
    
    public function reviews()
    {
        return $this->belongsTo('Review');
    }
}
