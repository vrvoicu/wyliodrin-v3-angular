/**
 * Created by victor on 23.07.2015.
 */
module.controller('userController', function ($scope, $auth, userService) {

        $scope.register = function () {
            userService.requestRegisterUser($scope.username, $scope.password, $scope.email, $scope.name);
        }

        $scope.authenticate = function(provider) {
            userService.socialLogin(provider);
        };

        $scope.logout=function(){
            $auth.logout();
            alert($auth.isAuthenticated());
        };

        $scope.deleteUser= function (username) {
            userService.requestDeleteUser(username);
        }

        var init = function () {
            userService.requestGetAllUsers($scope);
            /*if ($routeParams.ticketId) {
                $scope.ticketSelected($routeParams.ticketId);
            }*/
        };

        // fire on controller loaded
        init();
    }
);

module.service('userService', ['$auth', '$http', function ($auth, $http) {

    var address='192.168.0.17';

    var service = {
        users: [],

        requestRegisterUser: function(username, password, email, name){
            alert("a")
            $auth.signup({
                url : 'http://'+address+':8080/users/register',
                username: username,
                password: password,
                email: email,
                name: name
            })
                .then(function(response){

                })
                .catch(function(response){

                })
        },

        requestDeleteUser: function(username){
            $http({
                url: 'http://'+address+':8080/users/delete',
                method: 'POST',
                data: { username: username }
            })
                .then(function (response) {
                    alert(JSON.stringify(response));
                })
                .catch(function (response) {
                    if(response.data.status==403)
                        alert(JSON.stringify(response));
                });
        }

        socialLogin: function (provider) {
            $auth.authenticate(provider)
                .then(function(response){
                    alert($auth.isAuthenticated());
                    $auth.setToken(response.data.authToken, true);
                    alert(JSON.stringify(response));

                }).catch(function (response) {
                    //alert(JSON.stringify(response));
                })
        },

        requestGetAllUsers: function (scope) {
            $http({
                url: 'http://'+address+':8080/users/all',
                method: 'POST',
                data: {}
            })
                .then(function (response) {
                    scope.users=new Array();
                    data= jQuery.parseJSON(JSON.stringify(response.data));
                    for(var index=0; index<data.length; index++)
                        scope.users.push({
                            id : data[index]['id'],
                            name: data[index]['name'],
                            username: data[index]['username'],
                            email: data[index]['email']
                        });

                    /*for()
                    $.each(response.data, function(){
                        var user =
                        alert(response.datauser['id']);
                        scope.users.push({
                            id : user['id'],
                            name: user['name'],
                            username: user['username'],
                            email: user['email']
                        });
                    })*/
                })
                .catch(function(response){
                    alert("eror");
                })
        }
        /*addNode: function ( node ) {
         service.nodes.push( node );
         $rootScope.$broadcast( 'nodes.update' );
         },
         requestCreateNode: function(){
         alert($auth.isAuthenticated());
         $http({
         url: 'http://localhost:8080/nodes/create'
         })
         .then(function (response) {
         alert(JSON.stringify(response));
         })
         .catch(function (response) {
         if(response.data.status==403)
         alert(JSON.stringify(response));
         });
         },
         requestDeleteNode: function(nodeId){
         $http({
         url: 'nodes/deleteNode',
         nodeId: nodeId
         })
         .then(function(response){

         })
         .catch(function(response){

         });
         },
         requestSetNodePrivacy: function(nodeId){
         $http({
         url: 'nodes/setNodePrivacy',
         nodeId: nodeId
         });
         },
         requestGetAllNodes: function(){

         },
         requestGetUserDefinedNodes: function(){
         $http({
         url: 'nodes/all'
         })
         .then(function(response){
         $.each(data, function () {
         var obj = data;
         console.log(obj);
         $scope.results.push(
         {
         "id": obj["obj_id"],
         "text": obj["text"]
         }
         );


         });
         })
         .catch(function(response){

         })
         }*/
    }
    return service;
}]);
