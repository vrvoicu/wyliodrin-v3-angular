/**
 * Created by victor on 20.07.2015.
 */
var address='192.168.0.17:8080';

var module = angular.module("wyliodrin_v3", ['satellizer', 'ngRoute'])
    .config(function($authProvider, $routeProvider) {



        $routeProvider.when('/', {
            templateUrl : 'partials/home.html',
            //controller : 'home'
        })

            .when("/register",{
                url: '/register',
                templateUrl: 'partials/users/register.html',
                controller: 'userController'
            })

            .when('/login', {
                templateUrl : 'partials/login.html',
                controller : 'userController'
            }).when('/social_login', {
                templateUrl : 'partials/social_login.html',
                controller : 'userController'
            })


            //nodes
            //user
            .when('/nodes/createNode', {
                templateUrl: 'partials/nodes/create_node.html',
                controller: 'nodeController',
            })
            .when('/nodes/getNodes', {
                templateUrl: 'partials/nodes/show_nodes.html',
                controller: 'nodeController',
            })
            .when('/nodes/getNode/:entityId', {
                templateUrl: 'partials/nodes/show_node.html',
                controller: 'nodeController',
            })
            //admin
            .when('/nodes/adminCreateNodeType', {
                templateUrl: 'admin_partials/nodes/create_node_type.html',
                controller: 'nodeController',
            })
            .when('/nodes/adminGetNodeTypes', {
                templateUrl: 'admin_partials/nodes/show_node_types.html',
                controller: 'nodeController',
            })
            .when('/nodes/adminGetNodes', {
                templateUrl: 'admin_partials/nodes/show_nodes.html',
                controller: 'nodeController',
            })

            //projects
            .when('/projects/create', {
                templateUrl: 'partials/projects/create_project.html',
                controller: 'projectController',
            })

            .when('/projects/show', {
                templateUrl: 'partials/projects/show_projects.html',
                controller: 'projectController',
            })

            //blocks

            .when('/blocks/adminCreateBlock', {
                templateUrl: 'admin_partials/blocks/create_block.html',
                controller: 'blockController',
            })

            .when('/blocks/adminGetAllBlocks', {
                templateUrl: 'admin_partials/blocks/show_blocks.html',
                controller: 'blockController',
            })

            .when('/blocks/adminGetBlock/:entityId', {
                templateUrl: 'admin_partials/blocks/show_block.html',
                controller: 'blockController',
            })

            .when('/blocks/adminCreateCategory', {
                templateUrl: 'admin_partials/blocks/create_block_category.html',
                controller: 'blockController',
            })

            .when('/blocks/adminCreateSubcategory', {
                templateUrl: 'admin_partials/blocks/create_block_subcategory.html',
                controller: 'blockController',
            })

            .when('/blocks/adminGetCategories', {
                templateUrl: 'admin_partials/blocks/show_categories.html',
                controller: 'blockController',
            })

            .when('/blocks/adminGetSubcategories', {
                templateUrl: 'admin_partials/blocks/show_subcategories.html',
                controller: 'blockController',
            })

            //users
            .when('/users/getUser', {
                templateUrl: 'partials/users/show_user.html',
                controller: 'userController',
            })

            .when('/users/adminGetAllUsers', {
                templateUrl: 'admin_partials/users/show_users.html',
                controller: 'userController',
            })

            .when('/users/adminGetUser/:userId', {
                templateUrl: 'admin_partials/users/show_user.html',
                controller: 'userController',
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
            url: 'http://'+address+'/users/facebook'
        });

        $authProvider.google({
            clientId: '329239008240-b4f5d712bmf1660eudulrj389v8a14dg.apps.googleusercontent.com',
            url: 'http://'+address+'/users/google'
        });

        $authProvider.github({
            clientId: '67dc8adc092bdd00951d',
            url: 'http://'+address+'/users/github'
        });

        $authProvider.signupUrl = 'http://'+address+'/users/register';
        $authProvider.loginUrl = 'http://'+address+'s/users/login';
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
