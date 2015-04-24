var MyMovieApp = angular.module('MyMovieApp', ['firebase', 'ngRoute']);

MyMovieApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'MovieController',
                templateUrl: 'app/views/movies.html'
            })
            .when('/movies', {
                controller: 'MovieController',
                templateUrl: 'app/views/movies.html'
            })
            .when('/movies/new', {
                controller: 'MovieController',
                templateUrl: 'app/views/movieform.html'
            })
});