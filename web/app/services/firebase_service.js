MyMovieApp.service('FirebaseService', function ($firebase) {
    var firebaseRef = new Firebase('https://blinding-fire-9685.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovies = function () {
        return movies;
    };

    this.addMovie = function (movie) {
        movies.$add(movie);
    };
});