MyMovieApp.controller('MovieController', function ($scope, FirebaseService, $location, APIService) {

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

    $scope.findMovie = function () {
        APIService.findMovie($scope.nameSearch, $scope.yearSearch).success(function (json) {
            var tmp = json.Search;
            var apiMovies = [];
            var i = 0;
            for (var movie in tmp) {
                var tmp2 = tmp[i]
                apiMovies.push(tmp2);
                i++;
            }
            $scope.apiMovies = apiMovies;
        });
    }

});