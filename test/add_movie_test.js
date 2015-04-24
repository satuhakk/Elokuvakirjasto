describe('Add movie', function () {
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
                    description: 'Kissojen ja hiirten välinen taisto jatkuu Kissat Ja Hiiret -elokuvan viidennessä jatko-osassa.',
                    director: 'Filu Lee',
                    name: 'Kissat vs. Hiiret 6',
                    released: '2015'
                }
            ];
            return {
                addMovie: function (movie) {
                    movies.push(movie);
                },
                getMovies: function () {
                    return movies;
                }
            };
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();

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
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {
        expect(scope.movies.length).toBe(3);
        scope.newName = 'Tihulainen';
        scope.newDirector = 'Janni Jennijönni';
        scope.newReleased = '2002';
        scope.newDescription = 'Rotat valtaavat Väinö Auerin kadun naapuruston. HOAS lähtee selvittämään tuholaisongelmaa.';
        scope.addMovie();
        expect(scope.movies.length).toBe(4);
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        expect(true).toBe(false);
    });
});