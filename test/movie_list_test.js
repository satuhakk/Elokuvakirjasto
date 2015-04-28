describe('Movie list', function () {
    var controller, scope;
    var movies;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyMovieApp');

        FirebaseServiceMock = (function () {
            movies = [
                {
                    description: 'Tarina miehestä joka ei löytänyt kotiin baari-illan päätteeksi.',
                    director: 'Se harmaantunut mies',
                    name: 'Left Outside Alone',
                    released: '2010'
                },
                {
                    description: 'Mitä tehdä kun tytär haluaa Ultimate Fight Championiksi?',
                    director: 'Jåhan Kröger',
                    name: 'Not A Pretty Face',
                    released: '1994'
                },
                {
                    description: 'Kissojen ja hiirten välinen taisto jatkuu Kissat Ja Hiiret -elokuvan viidennessä huikeassa jatko-osassa.',
                    director: 'Filu Lee',
                    name: 'Kissat vs. Hiiret 6',
                    released: '2015'
                }
            ];
            return {
                getMovies: function () {
                    return movies;
                },
                removeMovie: function(index) {
                    movies.splice(index,1);
                }
            }
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('MovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should list all movies from the Firebase', function () {
        expect(FirebaseServiceMock.getMovies().length).toBe(3);
        expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
    });
    
    /* 
     * Testaa, että elokuvan pystyy poistamaan Firebasesta.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to remove a movie', function () {
        expect(FirebaseServiceMock.getMovies().length).toBe(3);
        FirebaseServiceMock.removeMovie(1);
        expect(FirebaseServiceMock.getMovies().length).toBe(2);
        expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
    });
});