/**
 * Created by victor-vm on 6/3/2015.
 */
angular.module('wyliodrin', ['ngRoute', 'satellizer'])
    .config(function($routeProvider, $authProvider) {

        $routeProvider.when('/', {
            templateUrl : 'partials/home.html',
            controller : 'home'
        }).when('/login', {
            templateUrl : 'partials/login.html',
            controller : 'loginCtrl'
        }).when('/info',{
            url: '/info',
            templateUrl: 'partials/info.html',
            controller: 'infoCtrl'
        }).when("/register",{
            url: '/register',
            templateUrl: 'partials/register.html',
            controller: 'registerCtrl'
        }).when('/error',{
            //url: '/error',

        }).otherwise('/');

        $authProvider.facebook({
            clientId: '1597991233810918',
            url: 'http://localhost:8080/facebook'
            //redirectUri: "http://localhost:8080/facebook"
        });

        $authProvider.google({
            clientId: '329239008240-b4f5d712bmf1660eudulrj389v8a14dg.apps.googleusercontent.com',
            url: 'http://localhost:8080/google'
        });

        $authProvider.github({
            clientId: '67dc8adc092bdd00951d',
            url: 'http://localhost:8080/github'
        });


        $authProvider.signupUrl = 'http://localhost:8080/register';
        $authProvider.loginUrl = 'http://localhost:8080/login';
        $authProvider.tokenName = "authToken";
        $authProvider.authHeader = 'X-Auth-Token';
        $authProvider.authToken = '';


    }).controller('social-auth',function($scope, $auth) {

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(response){
                alert($auth.isAuthenticated());
                $auth.setToken(response.data.authToken, true);
                alert(JSON.stringify(response));
            }).catch(function (response) {
                //alert(JSON.stringify(response));
            })
        };

        $scope.logout=function(){
            $auth.logout();
            alert($auth.isAuthenticated());
        };
    }).controller('navigation', function($auth){
        //$auth.logout();
        alert($auth.isAuthenticated());

    }).controller('home', function () {

    }).controller('registerCtrl', function($scope,$auth){
        $scope.register=function(){
            $auth.signup({
                username: $scope.username,
                password: $scope.password,
                email: $scope.email,
                name: $scope.name
            }).catch(function(response) {
                alert(JSON.stringify(response));
                /*if (typeof response.data.message === 'object') {
                    angular.forEach(response.data.message, function(message) {
                        $alert({
                            content: message[0],
                            animation: 'fadeZoomFadeDown',
                            type: 'material',
                            duration: 3
                        });
                    });
                } else {
                    $alert({
                        content: response.data.message,
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                }*/
            });
        }
    }).controller('loginCtrl', function($scope, $auth){
        $scope.login=function(){
            $auth.login({
                username: 'test',
                email: $scope.email,
                password: $scope.password
            })
                .then(function() {
                    alert($auth.isAuthenticated());
                    /*alert({
                        content: 'You have successfully logged in',
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });*/
                })
                .catch(function(response) {
                    alert(JSON.stringify(response));
                });
        }
    }).controller('infoCtrl', function($scope,$http) {

        /**
         * Get user's profile information.
         */
        $scope.info = function () {
            $http({
                url: "http://localhost:8080/aaaa",
                method: 'POST',
                data: {}
            }).then(function (response) {
                alert(JSON.stringify(response));
            });
            /*Account.getProfile()
                .success(function (data) {
                    $scope.user = data;
                })
                .error(function (error) {
                    $alert({
                        content: error.message,
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                });*/
        };
    });