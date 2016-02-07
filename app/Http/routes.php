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
    Route::get('/', 'HomeController@index');
    Route::get('/about', 'HomeController@about');
    
    Route::get('/json', 'HomeController@json');
    
    Route::get('/task', 'TaskController@index');
    Route::post('/task', 'TaskController@postTask');
    Route::delete('/task/{task}', 'TaskController@deleteTask');
});
