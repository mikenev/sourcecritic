<?php


use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
   
    Route::get('/', 'ReviewController@index');
    Route::get('/reviews/', 'ReviewController@index');
    Route::get('/reviews/{id}', 'ReviewController@index');
    
    Route::post('/api/reviews', 'ReviewController@newReview');
    Route::post('/api/reviews/comments', 'ReviewController@postComment');
    Route::get('/api/reviews/{id}', 'ReviewController@getReview');
    Route::patch('/api/reviews/{id}', 'ReviewController@updateReview');
});
