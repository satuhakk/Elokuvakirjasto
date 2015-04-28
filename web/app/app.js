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
            .when('/movies/:key', {
                controller: 'ShowMovieController',
                templateUrl: 'app/views/moviepage.html'
            })
            .when('/movies/:key/edit', {
                controller: 'EditingController',
                templateUrl: 'app/views/edit.html'
            });
});