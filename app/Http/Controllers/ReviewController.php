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
    
    public function newReview(Request $request)
    {
        $this->validate($request, [
            'review_name' => 'required|max:255',
            'file' => 'required',
        ]);
        
        $name = $request->input('review_name');
        $file = $request->file('file');
               
        $contents = file_get_contents($request->file('file')->getPathname());
        
        return response()->json(['reviewId' => uniqid(), 'reviewName' => $name, 'contents' => $contents]);
    }
}
