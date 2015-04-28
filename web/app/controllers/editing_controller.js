MyMovieApp.controller('EditingController', function ($scope, FirebaseService, $location, $routeParams) {

    FirebaseService.getMovieInfo($routeParams.key, function (info) {
        $scope.info = info;
        $scope.editName = info.name;
        $scope.editDirector = info.director;
        $scope.editReleased = info.released;
        $scope.editDesc = info.desc;
    });

    $scope.editMovie = function () {
        var movie = $scope.info;
        if ($scope.editName != '' && $scope.editDesc != '' &&
                $scope.editDirector != '' && $scope.editReleased != '') {
            movie.name = $scope.editName;
            movie.director = $scope.editDirector;
            movie.released = $scope.editReleased;
            movie.desc = $scope.editDesc;
            FirebaseService.editMovie(movie);
            $location.path('/movies');
        }
    };
});