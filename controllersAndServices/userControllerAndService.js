/**
 * Created by victor on 23.07.2015.
 */
module.controller('userController', function ($scope, $auth, userService, $routeParams) {

        $scope.adminUpdateUser = function () {

            var id = $scope.entity.id;
            var name = $scope.entity.name;
            var email = $scope.entity.accounts[0].userEmails[0].email;
            var username = $scope.entity.username;
            var password = $scope.password;
            var type = $scope.entity.type;

            var promise = userService.requestAdminUpdateUser(id, name, username, password, email, type);

            promise.then(
                function (response) {
                    var data = jQuery.parseJSON(JSON.stringify(response.data));
                    $scope.entity = data;
                },
                function(error){
                    handleErrorCallback(error);
                }
            );
        }
        
        $scope.getUserTypes = function () {
            var promise = userService.requestGetUserTypes();

            promise.then(
                function (response) {
                    var data = jQuery.parseJSON(JSON.stringify(response.data));
                    $scope.attributes = data;
                },
                function(error){
                    handleErrorCallback(error);
                }
            );
        }

        $scope.createUser = function(){

            var email = $scope.email;
            var username = $scope.username;
            var name = $scope.name;
            var password = $scope.password;
            var type = $scope.userType;

            var promise = userService.requestCreateUser(name, username, password, email, type);

            promise.then(
                function (response) {

                },
                function(error){
                    handleErrorCallback(error);
                }
            );
        }

        $scope.register = function () {

            var name = $scope.name;
            var email = $scope.email;
            var username = $scope.username;
            var password = $scope.password;

            var promise = userService.requestRegisterUser($scope.name, $scope.email, $scope.username, $scope.password);
            
            promise.then(
                function (response) {
                    $auth.setToken(response.data.authToken, true);
                },
                function(error){
                    handleErrorCallback(error);
                }
            )
        }
        
        $scope.login = function () {

            var email = $scope.email;
            var password = $scope.password;

            var promise = userService.requestLogin(email, password);

            promise.then(
                function (response) {
                    $auth.setToken(response.data.authToken, true);
                },
                function(error){
                    handleErrorCallback(error);
                }
            )
        }

        $scope.authenticate = function(provider) {
            userService.socialLogin(provider);
        };

        $scope.logout=function(){
            $auth.logout();
            alert($auth.isAuthenticated());
        };

        /*$scope.deleteUser= function (username) {
            userService.requestDeleteUser(username);
        }*/

        $scope.adminGetUser = function(){

            var userId = $routeParams.userId;

            var promise = userService.requestAdminGetUser(userId);

            promise.then(
                function (response) {

                    var data = jQuery.parseJSON(JSON.stringify(response.data));
                    $scope.entity = data;

                }
            )

        },

        $scope.adminGetAllUsers = function(){

            var promise = userService.requestAdminGetAllUsers();

            promise.then(
                function (response) {

                    $scope.entities = new Array();
                    if(response.status == 200){
                        var data = jQuery.parseJSON(JSON.stringify(response.data));
                        $scope.entities = data;
                    }

                }
            )
        }

        $scope.adminDeleteUser = function(userId){

            var userId = userId;

            var promise = userService.requestAdminDeleteUser(userId);

            promise.then(
                function(response){
                    $scope.adminGetAllUsers();
                },
                function(error){
                    handleErrorCallback(error);
                }
            )

        }
    }
);

module.service('userService', ['$auth', '$http', function ($auth, $http) {

    var service = {

        requestAdminUpdateUser: function (id, name, username, password, email, type) {
            //alert(id+" "+name+" "+username+" "+password+" "+password+" "+email+" "+type);
            return $http({
                url : "http://"+address+"/users/adminUpdateUser",
                method: 'POST',
                data: {
                    id: id,
                    name: name,
                    username: username,
                    password: password,
                    email: email,
                    type: type
                }
            })
        },
        
        requestCreateUser : function (name, username, password, email, type) {

            return $http({
                url : "http://"+address+"/users/adminCreateUser",
                method: 'POST',
                data: {
                    name: name,
                    username: username,
                    password: password,
                    email: email,
                    userType: type
                }
            })
        },
        
        requestGetUserTypes: function () {
            return $http({
                url : "http://"+address+"/users/getUserTypes",
                method: 'GET'
            })
        },

        requestAdminDeleteUser: function (userId) {
            return $http({
                url : "http://"+address+"/users/adminDeleteUser/"+userId,
                method: 'DELETE'
            })
        },

        requestAdminGetUser: function(userId){
            return $http({
                url : "http://"+address+"/users/adminGetUser/"+userId,
                method: 'GET'
            })
        },

        requestAdminGetAllUsers: function(){
            return $http({
                url : 'http://'+address+'/users/adminGetAllUsers',
                method: 'GET'
            })
        },

        requestRegisterUser: function(name, email, username, password){

            return $auth.signup({
                username: username,
                password: password,
                email: email,
                name: name
            })

        },

        requestLogin: function (email, password) {
          return $auth.login({
              email: email,
              password: password
          })
        },

        requestDeleteUser: function(username){
            $http({
                url: 'http://'+address+'/users/delete',
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
        },

        socialLogin: function (provider) {
            $auth.authenticate(provider)
                .then(function(response){
                    alert($auth.isAuthenticated());
                    $auth.setToken(response.data.authToken, true);
                    alert(JSON.stringify(response));

                }).catch(function (response) {
                    //alert(JSON.stringify(response));
                })
        }

    }
    return service;
}]);
