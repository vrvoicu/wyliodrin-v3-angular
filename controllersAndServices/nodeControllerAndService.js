/**
 * Created by victor on 23.07.2015.
 */
module.controller('nodeController', function($scope, $auth, nodeService, $routeParams){

    $scope.createNodeType = function () {

        var nodeTypeName = $scope.nodeTypeName;

        var promise = nodeService.requestCreateNodeType(nodeTypeName);

        promise
            .then(
                function(response){
                },
                function(error){

                }
            )
    }
    
    $scope.getNodeTypes = function () {

        var promise = nodeService.requestGetNodeTypes();

        promise.then(
            function(response){
                var data = jQuery.parseJSON(JSON.stringify(response.data));
                $scope.entities = data;
            },
            function(error){

            }
        )
    }

    $scope.deleteNodeType = function (nodeTypeId) {

        var promise = nodeService.requestDeleteNodeType(nodeTypeId);

        promise.then(
            function(response){
                $scope.getNodeTypes();
            },
            function(error){

            }
        )
    }

    /*$scope.getAllNodes = function (){

        var promise = nodeService.requestGetAllNodes();

        promise.then(
            function(response){
                var data = jQuery.parseJSON(JSON.stringify(response.data));
                $scope.entities = data;
            },
            function(error){

            }
        )
    }*/

    
    $scope.createNode = function () {

        var nodeName = $scope.myNodeName;
        var nodeType = $scope.myNodeType;
        var nodeScript = $scope.nodeScript;

        var promise = nodeService.requestCreateNode(nodeName, nodeType, nodeScript);

        promise.then(
            function(response){

            },
            function(error){

            }
        )

    }

    $scope.getNode = function(){

        var nodeId = $routeParams.entityId;

        var promise = nodeService.requestGetNode(nodeId);

        promise.then(
            function(response){
                var data = jQuery.parseJSON(JSON.stringify(response.data));
                $scope.entity = data;
            },
            function(error){

            }
        )
    }

    $scope.getNodes = function () {

        var promise = nodeService.requestGetNodes();

        promise.then(
            function(response){
                var data = jQuery.parseJSON(JSON.stringify(response.data));
                $scope.entities = data;
            },
            function(error){

            }
        )
    }

    $scope.deleteNode = function (nodeId) {

        var promise = nodeService.requestDeleteNode(nodeId);

        promise.then(
            function(response){
                $scope.getNodes();
            },
            function(error){

            }
        )
    }
})

module.service( 'nodeService', [ '$auth', '$http', function($auth, $http) {

    var service = {
        
        /*requestGetAllNodes: function () {
            return $http({
                url: 'http://'+address+'/nodes/adminGetAllNodes',
                method: 'GET',
            })
        },*/

        requestDeleteNodeType: function(nodeTypeId){
            return $http({
                url: 'http://'+address+'/nodes/adminDeleteNodeType/'+nodeTypeId,
                method: 'DELETE',
            })
        },

        requestGetNodeTypes : function(){
            return $http({
                url: 'http://'+address+'/nodes/getNodeTypes',
                method: 'GET',
            })
        },

        requestCreateNodeType : function (nodeTypeName) {
            return $http({
                url: 'http://'+address+'/nodes/adminCreateNodeType',
                method: 'POST',
                data: {
                    nodeTypeName: nodeTypeName
                }
            })
        },

        requestCreateNode: function(nodeName, nodeType, nodeScript){
            return $http({
                url: 'http://'+address+'/nodes/createNode',
                method: 'POST',
                data: {
                    nodeName: nodeName,
                    nodeType: nodeType,
                    nodeScript: nodeScript
                }
            })
        },
        
        requestGetNode: function (nodeId) {
            return $http({
                url: 'http://'+address+'/nodes/getNode/'+nodeId,
                method: 'GET',
            })
        },

        requestGetNodes: function () {
            return $http({
                url: 'http://'+address+'/nodes/getNodes',
                method: 'GET',
            })
        },

        requestDeleteNode: function(nodeId){
            return $http({
                url: 'http://'+address+'/nodes/deleteNode/'+nodeId,
                method: 'DELETE'
            })
        }
    }
    return service;
}]);