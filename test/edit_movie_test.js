describe('Edit movie', function () {
    var controller, scope;
    var movies;
    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyMovieApp');

        FirebaseServiceMock = (function () {
            movies = [
                {
                    name: 'Joku leffa',
                    director: 'Kalle Ilves',
                    released: 2015,
                    desc: 'Mahtava leffa!'
                }
            ]
            return {
                getMovieInfo: function (key, done) {
                    if (key == '123') {
                        done({
                            name: 'Joku leffa',
                            director: 'Kalle Ilves',
                            released: 2015,
                            desc: 'Mahtava leffa!'
                        });
                    } else {
                        done(null);
                    }
                },
                editMovie: function (info) {
                    movies[0]=info;
                    }
                
            }
        })();

        RouteParamsMock = (function () {
            return {
                key: '123'
            }
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovieInfo').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('EditingController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        FirebaseServiceMock.getMovieInfo(123, function (info) {
            scope.info = info;
        });
        expect(scope.editName).toBeDefined();
        expect(FirebaseServiceMock.getMovieInfo).toHaveBeenCalled();
    })

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        FirebaseServiceMock.getMovieInfo(123, function (info) {
            scope.info = info;
        });

        scope.editName = 'Jepa';
        scope.editDirector = 'Joopa joo';
        scope.editReleased = '2000';
        scope.editDesc = 'Kuvaustekstia diibadaaba';
        scope.editMovie();

        expect(movies[0].name).toEqual(scope.editName);
        expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();
    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        FirebaseServiceMock.getMovieInfo(123, function (info) {
            scope.info = info;
        });

        scope.editName = 'Jepa';
        scope.editDirector = 'Joopa joo';
        scope.editReleased = '2000';
        scope.editDesc = '';
        scope.editMovie();

        expect(movies[0].name).not.toEqual(scope.editName);
        expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
    });
});