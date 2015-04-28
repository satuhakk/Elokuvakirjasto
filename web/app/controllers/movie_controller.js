MyMovieApp.controller('MovieController', function ($scope, FirebaseService, $location) {
    
    $scope.movies = FirebaseService.getMovies();

    $scope.addMovie = function () {
        if ($scope.newName != '' && $scope.newDesc != '' &&
                $scope.newDirector != '' && $scope.newReleased != '') {
            FirebaseService.addMovie({
                name: $scope.newName,
                director: $scope.newDirector,
                released: $scope.newReleased,
                desc: $scope.newDesc
            })
            $location.path('/movies');
        }
    }

    $scope.removeMovie = function (movie) {
        FirebaseService.removeMovie(movie);
    }
});