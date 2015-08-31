/**
 * Created by victor on 8/19/15.
 */

module.controller('projectController', function($scope, $auth, projectService){

    this.page = 0;

    $scope.showProjectsInit = function(){
        $scope.getAllProjects();
    }


    $scope.createProject=function(){

        var callback = function(response){
            alert(response.status);
            if(response.status == 200){

            }
            else {
                if(response.status == 400){

                }
                else if(response.status == RESPONSE_PROJECT_INEXISTENT){
                }
                else if(response.status == RESPONSE_PROJECT_WITH_NAME_EXISTS){
                }
                else if(response.status = RESPONSE_PROJECT_WRONG_NAME_FORMAT){
                }
            }
        }

        projectService.requestCreateProject(callback, $scope.projectName);
    },

    $scope.getPrjectById = function(){
        var callback = function(response){
            if(response.status == 200){

            }
            else {
                if(response.status == 400){

                }
                else if(response.status == RESPONSE_PROJECT_INEXISTENT){
                }
                else if(response.status == RESPONSE_PROJECT_WITH_NAME_EXISTS){
                }
                else if(response.status = RESPONSE_PROJECT_WRONG_NAME_FORMAT){
                }
            }
        }

        var projectId = $scope.projectId;

        projectService.requestProjectById(callback, projectId);
    }

    $scope.getAllProjects = function () {
        var callback = function(response){

            if(response.status === 200){
                $scope.projects=new Array();
                var data = jQuery.parseJSON(JSON.stringify(response.data));
                for(var index=0; index<data.length; index++)
                    $scope.projects.push({
                        id : data[index]['projectId'],
                        name: data[index]['name'],
                        public: data[index]['public']
                    });
            }
            else{
                if(response.status == 400){

                }
            }
        }

        projectService.requestAllUserProjects(callback);
    }

    /*$scope.getAllProjectsPage = function () {
        var callback = function(response){

            if(response.status === 200){
                $scope.projects=new Array();
                var data = jQuery.parseJSON(JSON.stringify(response.data));
                for(var index=0; index<data.length; index++)
                    $scope.projects.push({
                        id : data[index]['projectId'],
                        name: data[index]['name'],
                        public: data[index]['public']
                    });
            }
            else{
                if(response.status == 400){

                }
            }
        }

        projectService.requestAllUserProjectsPage(callback, page);
    }*/

    $scope.deleteProjectById = function(projectId){
        var callback = function(response){

            if(response.status === 200){
                $scope.getAllProjects();
            }
            else{
                if(response.status == 400){

                }
            }
        }

        projectService.requestDeleteProjectById(callback, projectId);

    }

    $scope.deleteAllProjects = function(){
        var callback = function(response){

            if(response.status === 200){
                $scope.getAllProjects();
            }
            else{
                if(response.status == 400){

                }
            }
        }

        projectService.requestDeleteAllProjects(callback);
    }

    $scope.adminGetAllProjects = function () {
        var callback = function(response){

            if(response.status === 200){

            }
            else{
                if(response.status == 400){

                }
            }
        }

        projectService.requestAdminGetAllProjects(callback);
    }

    $scope.adminGetUserProjects = function () {
        var callback = function(response){

            if(response.status === 200){

            }
            else{
                if(response.status == 400){

                }
            }
        }

        var userId = $scope.userId;

        projectService.requestAdminGetUserProjects(callback, userId);
    }

    $scope.adminDeleteAllProjects = function(){
        var callback = function(response){

            if(response.status === 200){

            }
            else{
                if(response.status == 400){

                }
            }
        }

        projectService.requestAdminDeleteAllProjects(callback);
    }

    $scope.deleteUserProjects = function(){
        var callback = function(response){

            if(response.status === 200){

            }
            else{
                if(response.status == 400){

                }
            }
        }

        var userId = $scope.userId;

        projectService.requestAdminDeleteAllUserProjects(callback, userId);
    }

    $scope.adminDeleteUserProject = function () {
        var callback = function(response){

            if(response.status === 200){

            }
            else{
                if(response.status == 400){

                }
            }
        }

        var projectId = $scope.projectId;

        projectService.requestAdminDeleteUserProjectById(callback, projectId);
    }

    /*$scope.setNodeScript= function () {
        alert($scope.nodeId);
        alert($scope.nodeScript);
        //nodeService.requestSetNodeScript($scope.nodeId, $scope.nodeScript);
    }*/
})

module.service( 'projectService', [ '$auth', '$http', function($auth, $http) {

    var address='192.168.0.17:8080';

    var service = {
        /*nodes : [],

         addNode: function ( node ) {
         service.nodes.push( node );
         $rootScope.$broadcast( 'nodes.update' );
         },*/

        requestCreateProject: function (callback, projectName) {
            alert($auth.isAuthenticated());
            $http({
                url: 'http://' + address + '/projects/create',
                method: 'POST',
                data: {name: projectName}
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        },

        requestProjectById: function (callback, projectId) {
            $http({
                url: "http://" + address + "/projects/getProjectById",
                method: "POST",
                data: {projectId: projectId}
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        },

        requestAllUserProjects: function (callback) {
            $http({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "http://" + address + "/projects/getProjects",
                method: "POST",
                data: {}
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        },

        requestDeleteProjectById: function (callback, projectId) {
            $http({
                url: "http://" + address + "/projects/deleteById",
                method: "POST",
                data: {
                    projectId: projectId
                }
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        },

        requestDeleteAllProjects: function (callback) {
            $http({
                url: "http://" + address + "/projects/deleteAll",
                method: "POST",
                data: {}
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        },

        requestAdminGetAllProjects: function (callback) {
            $http({
                url: "http://" + address + "/projects/adminGetAllProjects",
                method: "POST",
                data: {}
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        },

        requestAdminGetUserProjects: function (callback, userId){
            $http({
                url: "http://" + address + "/projects/adminGetUserProjects",
                method: "POST",
                data: {
                    userId: userId
                }
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        },

        requestAdminDeleteUserProjectById: function(callback, projectId){
            $http({
                url: "http://" + address + "/projects/adminDeleteUserProjectById",
                method: "POST",
                data: {
                    projectId: projectId
                }
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        },

        requestAdminDeleteAllUserProjects: function(callback, userId){
            $http({
                url: "http://" + address + "/projects/adminDeleteAllUserProjects",
                method: "POST",
                data: {}
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        },

        requestAdminDeleteAllProjects: function(callback){
            $http({
                url: "http://" + address + "/projects/adminDeleteAllProjects",
                method: "POST",
                data: {}
            })
                .then(function (response) {
                    callback(response);
                })
                .catch(function (response) {
                    callback(response);
                });
        }
    }

    return service;
}]);