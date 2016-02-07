<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index()
    {
        return view('home.index');
    }
    
    public function json() 
    {
        return response()->json(['name' => 'Test', 'state' => 'HI']);
    }
}
