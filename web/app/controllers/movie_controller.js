MyMovieApp.controller('MovieController', function ($scope, FirebaseService, $location) {
    $scope.movies = FirebaseService.getMovies();
    $scope.addMovie = function () {

        if ($scope.newName != '' && $scope.newDescription != '' &&
                $scope.newDirector != '' && $scope.newReleased != '') {
            FirebaseService.addMovie({
                name: $scope.newName,
                director: $scope.newDirector,
                released: $scope.newReleased,
                description: $scope.newDescription
            })
            $location.path('/movies');
//            $scope.newName = '';
//            $scope.newDirector = '';
//            $scope.newReleased = '';
//            $scope.newDescription = '';
        }
    }

});