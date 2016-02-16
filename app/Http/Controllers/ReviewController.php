<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ReviewController extends Controller
{
    public function index($id = null)
    {
        return view('reviews.index');
    }
    
    public function getReview($id) 
    {
        return response()->json(['name' => 'Test', 'state' => 'HI']);
    }
}
