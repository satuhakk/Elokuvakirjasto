describe('Add movie', function () {
    var controller, scope;
    var movies;
    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyMovieApp');

        FirebaseServiceMock = (function () {
            movies = [
                {
                    desc: 'Tarina miehestä joka ei löytänyt kotiin baari-illan päätteeksi.',
                    director: 'Se harmaantunut mies',
                    name: 'Left Outside Alone',
                    released: '2010'
                },
                {
                    desc: 'Mitä tehdä kun tytär haluaa Ultimate Fight Championiksi?',
                    director: 'Jåhan Kröger',
                    name: 'Not A Pretty Face',
                    released: '1994'
                },
                {
                    desc: 'Kissojen ja hiirten välinen taisto jatkuu Kissat Ja Hiiret -elokuvan viidennessä huikeassa jatko-osassa.',
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
        expect(FirebaseServiceMock.getMovies().length).toBe(3);
//        var movie = {
//            name: 'Tihulainen',
//            director: 'Janni Jennijönni',
//            released: '2002',
//            description: 'Rotat valtaavat Väinö Auerin kadun naapuruston. HOAS lähtee selvittämään tuholaisongelmaa.'
//        }
        scope.newName = 'Jepa';
        scope.newDirector = 'Joopa joo';
        scope.newReleased = '2000';
        scope.newDesc = 'Kuvaustekstia diibadaaba';
        scope.addMovie();
        expect(FirebaseServiceMock.getMovies().length).toBe(4);
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });
    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        expect(FirebaseServiceMock.getMovies().length).toBe(3);
//        var movie = {
//            name: 'Tihulainen',
//            director: 'Janni Jennijönni',
//            released: '2002',
//            description: 'Rotat valtaavat Väinö Auerin kadun naapuruston. HOAS lähtee selvittämään tuholaisongelmaa.'
//        }
        scope.newName = 'Jepa';
        scope.newDirector = 'Joopa joo';
        scope.newReleased = '2000';
        scope.newDesc = '';
        scope.addMovie();
        expect(FirebaseServiceMock.getMovies().length).toBe(3);
        expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
    });
});