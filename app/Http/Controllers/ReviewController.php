<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\File;
use App\Review;
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
        $review = Review::findOrFail($id);
        return response()->json(['name' => $review->name, 'statusId' => $review->status_id]);
    }
    
    public function newReview(Request $request)
    {
        $this->validate($request, [
            'review_name' => 'required|max:255',
            'file' => 'required',
        ]);
        
        $id = uniqid();
        $name = $request->input('review_name');
        
        $file = $request->file('file');
        $contents = file_get_contents($request->file('file')->getPathname());
                
        $review = new Review();
        $review->id = $id;
        $review->name = $name;
        $review->save();
        
        $dbFile = new File();
        $dbFile->review_id = $id;
        $dbFile->contents = $contents;
        $dbFile->type = $file->getMimeType();
        $dbFile->name = $file->getClientOriginalName();
        $dbFile->size = $file->getClientSize();
        $dbFile->save();
        
        return response()->json(['reviewId' => $id, 'reviewName' => $name, 'contents' => $contents]);
    }
}
