<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
    
    public function reviews()
    {
        return $this->belongsTo('App\Review', 'review_id');
    }
}
