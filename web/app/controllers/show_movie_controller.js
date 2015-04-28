MyMovieApp.controller('ShowMovieController', function ($scope, FirebaseService, $location, $routeParams) {
    
    FirebaseService.getMovieInfo($routeParams.key, function (info) {
        $scope.info = info;
    });
    
});