describe('Show movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyMovieApp');

        FirebaseServiceMock = (function () {
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

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('ShowMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routePrams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /* 
     * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
     * käyttämällä toBeCalled-oletusta.
     */
    it('should show current movie from Firebase', function () {
        FirebaseServiceMock.getMovieInfo('123', function (info) {
            scope.info = info;
        });
        expect(scope.info.name).toBe('Joku leffa');
    });
});