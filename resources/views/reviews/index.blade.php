@extends('layouts.review')

@section('content')

<div class="row maincontent">
    <div class="col-xs-2 fill">
        @include('reviews.files')
    </div>
    <div class="col-xs-10 fill">
        @include('reviews.main')
    </div>
</div>
<div class="row bottomcontainer">
    <div class="col-xs-2 fill">
        @include('reviews.users')
    </div>
    <div class="col-xs-10 fill">
        @include('reviews.comments')
    </div>
</div>

@endsection