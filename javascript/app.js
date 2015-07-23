/**
 * Created by victor on 20.07.2015.
 */
var module = angular.module("wyliodrin_v3", ['satellizer', 'ngRoute'])
    .config(function($authProvider, $routeProvider) {

        $routeProvider.when('/', {
            templateUrl : 'partials/home.html',
            //controller : 'home'
        })

            .when("/register",{
                url: '/register',
                templateUrl: 'partials/register.html',
                controller: 'userController'
            }).when('/login', {
                templateUrl : 'partials/login.html',
                controller : 'userController'
            }).when('/social_login', {
                templateUrl : 'partials/social_login.html',
                controller : 'userController'
            })

            .when('/users/all', {
                templateUrl: 'admin_partials/users.html',
                controller: 'userController',
            })

            .when('/nodes/create', {
                templateUrl: 'partials/nodes/create_node.html',
                controller: 'nodeController',
            })
            .when('/nodes/script', {
                templateUrl: 'partials/nodes/set_node_script.html',
                controller: 'nodeController',
            })

            /*.when('/login', {
             templateUrl : 'partials/login.html',
             controller : 'loginCtrl'
             }).when("/register",{
             url: '/register',
             templateUrl: 'partials/register.html',
             controller: 'userController'
             }).when('/error',{
             //url: '/error',

             })*/

            .otherwise('/');

        $authProvider.facebook({
            clientId: '1597991233810918',
            url: 'http://localhost:8080/users/facebook'
        });

        $authProvider.google({
            clientId: '329239008240-b4f5d712bmf1660eudulrj389v8a14dg.apps.googleusercontent.com',
            url: 'http://localhost:8080/users/google'
        });

        $authProvider.github({
            clientId: '67dc8adc092bdd00951d',
            url: 'http://localhost:8080/users/github'
        });

        $authProvider.signupUrl = 'http://localhost:8080/users/register';
        $authProvider.loginUrl = 'http://localhost:8080/users/login';
        $authProvider.tokenName = "authToken";
        $authProvider.authHeader = 'X-Auth-Token';
        $authProvider.authToken = '';
    });

module.controller('navigationController', function($auth){
    //$auth.logout();
    //alert($auth.isAuthenticated());
})

module.service('authService', ['$auth', function ($auth) {
    var service={
        authFacebook: function(){

        },
        authGithub: function () {

        },
        authGoogle: function(){

        },
        regster: function (name, username, password, email) {

        },
        login: function(email, password){

        }
    }
}])


module.service( 'blockService', [ '$rootScope', function( $rootScope ) {
    var service = {
        blocks : [],
        addBlock: function ( block ) {
            service.blocks.push( block );
            $rootScope.$broadcast( 'blocks.update' );
        },
        requestAddBlock: function(){

        }
    }
    return service;
}]);

module.service( 'gadgetService', [ '', function( $rootScope ) {
    var service = {
        gadgets : [],
        addGadget: function ( gadget ) {
            service.gadgets.push( gadget );
            $rootScope.$broadcast( 'gadgets.update' );
        }
    }
    return service;
}]);
