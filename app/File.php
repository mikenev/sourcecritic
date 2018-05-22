<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    public static $AcceptTypes = array(
        'text/plain',
        'text/x-asm', // some css
	'text/x-php',
	'text/x-Algol68'
    );
    
    public static $InvalidFileNames = array(
        'nbproject/', // netbeans project files
        '__macosx/',  // mac .zip remnants
        '._'          // mac temp file 
    );
    
    public static function IsValidNameName($name) {
        $lcName = strtolower($name);
        $valid = true;
        
        foreach (File::$InvalidFileNames as $invalidName) {
            if (strpos($lcName, $invalidName) !== false) {
                $valid = false;
            }
        }
        
        return $valid;
    }
    
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
    
    public function reviews()
    {
        return $this->belongsTo('App\Review', 'review_id');
    }
    
}
