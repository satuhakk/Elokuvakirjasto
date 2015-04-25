describe('Movie list', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyMovieApp');

        FirebaseServiceMock = (function () {
            var movies = [
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
                }
            }
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('MyMovieApp', {
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
        expect(scope.movies.length).toBe(3);
        var tmp = [];
        tmp = scope.getMovies();
        expect(tmp.length).toBe(3);
        expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
    });

    /* 
     * Testaa, että elokuvan pystyy poistamaan Firebasesta.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to remove a movie', function () {
        expect(true).toBe(false);
    });
});