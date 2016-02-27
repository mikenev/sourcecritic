<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    
    
    public function file()
    {
        return $this->belongsTo('File');
    }
    
    public function user()
    {
        return $this->belongsTo('User');
    }
}
