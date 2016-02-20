<!DOCTYPE html>
<html lang="en" ng-app="reviewApp">
    <head>
        <title>Source Critique</title>

        <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>

        <!-- Angular -->
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-resource.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-route.min.js"></script>
        
        <!-- Bootstrap -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="/css/yeti.css" />
        
        
        <link rel="stylesheet" href="/css/main.css" />
        <script src="/scripts/controllers.js"></script>
        <script src="/scripts/services.js"></script>
    </head>

    <body ng-controller="reviewController">
        <div class="row">
            <nav class="navbar navbar-inverse col-xs-12">
            <div class="container-fluid">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Welcome to Source Critique: </a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Menu<span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#" ng-click="newReview()">New Review</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a href="https://github.com/mikenev/sourcecritic">About / GitHub</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </div>
        @yield('content')
    </body>
</html>