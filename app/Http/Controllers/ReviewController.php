<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

use App\Comment;
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
        $comments = array();
        
        foreach ($review->files as $file) {
            foreach ($file->comments as $comment) {
                array_push($comments, $comment);
            }
        }
        
        return response()->json([
            'name' => $review->name,
            'statusId' => $review->status_id,
            'files' => $review->files->toArray(),
            'comments' => $comments]);
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
                
        $review = new Review();
        $review->id = $id;
        $review->name = $name;
        $review->save();
       
        if ($file->getMimeType() == 'application/zip') {
            $zip = zip_open($request->file('file')->getPathName());
            
            if (is_resource($zip)) {
                while ($zip_entry = zip_read($zip)) {
                    $name = zip_entry_name($zip_entry);
                    $size = zip_entry_filesize($zip_entry);
                    
                    if (zip_entry_open($zip, $zip_entry, 'r')) {
                        $contents = zip_entry_read($zip_entry, $size);
                        $finfo = new \finfo(FILEINFO_MIME_TYPE);
                        $type = $finfo->buffer($contents);
                        
                        if (in_array($type, File::$AcceptTypes) &&
                            File::IsValidNameName($name)) {
                            $dbFile = new File();
                            $dbFile->review_id = $id;
                            $dbFile->contents = $contents;
                            $dbFile->type = $type;
                            $dbFile->name = $name;
                            $dbFile->size = $size;
                            $dbFile->save();
                        }
                    }
                    
                    zip_entry_close($zip_entry);
                }
            }
            
        } else {
            $dbFile = new File();
            $dbFile->review_id = $id;
            $dbFile->contents = file_get_contents($request->file('file')->getPathname());
            $dbFile->type = $file->getMimeType();
            $dbFile->name = $file->getClientOriginalName();
            $dbFile->size = $file->getClientSize();
            $dbFile->save();
        }
        
        return redirect('reviews/' . $id);
    }
    
    public function postComment(Request $request) {
        $this->validate($request, [
            'fileId' => 'required|integer',
            'start' => 'required|integer',
            'end' => 'required|integer',
            'content' => 'required|max:256|string'
        ]);
        
        $comment = new Comment();
        $comment->file_id = $request->input('fileId');
        $comment->start = $request->input('start');
        $comment->end = $request->input('end');
        $comment->content = $request->input('content');
        
        $comment->save();
        
        return($comment->toJson());
    }
    
    public function updateReview(Request $request, $id) {
        $this->validate($request, [
            'statusId' => 'sometimes|integer'
        ]);
        
        $review = Review::findOrFail($id);
        $review->status_id = $request->input('statusId');
        $review->save();
        
        return($review->toJson());
    }
}
