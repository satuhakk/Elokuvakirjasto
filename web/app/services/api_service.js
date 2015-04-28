MyMovieApp.service('APIService', function($http){
    
  this.findMovie = function(name, year){
    return $http.get('//www.omdbapi.com', { params: { s: name, y: year } });
  };
  
});