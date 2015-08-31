/**
 * Created by victor on 23.07.2015.
 */
module.controller('userController', function ($scope, $auth, userService, $routeParams) {

        $scope.register = function () {

            var promise = userService.requestRegisterUser($scope.username, $scope.password, $scope.email, $scope.name);
            
            /*promise.then(
                function (response) {
                    $auth.setToken(response.data.authToken, true);
                },
                function(error){
                    handleErrorCallback(error);
                }
            )*/
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
        },

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

        requestRegisterUser: function(username, password, email, name){

            return $auth.signup({
                username: username,
                password: password,
                email: email,
                name: name
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
        },

        requestGetAllUsers: function (scope) {
            $http({
                url: 'http://'+address+'/users/all',
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
    }
    return service;
}]);
