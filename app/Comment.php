<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    
    
    public function file()
    {
        return $this->belongsTo('App\File');
    }
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
