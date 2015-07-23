/**
 * Created by victor on 23.07.2015.
 */
module.controller('nodeController', function($scope, $auth, nodeService){
    $scope.createNode=function(){
        nodeService.requestCreateNode($scope.nodeName);
    }
    $scope.deleteNode=function(){
        nodeService.requestDeleteNode(1);
        nodeService.requestDeleteNode(1);
    }

    $scope.setNodeScript= function () {
        alert($scope.nodeId);
        alert($scope.nodeScript);
        //nodeService.requestSetNodeScript($scope.nodeId, $scope.nodeScript);
    }
})

module.service( 'nodeService', [ '$auth', '$http', function($auth, $http) {

    var address='192.168.0.17';

    var service = {
        nodes : [],
        addNode: function ( node ) {
            service.nodes.push( node );
            $rootScope.$broadcast( 'nodes.update' );
        },
        requestCreateNode: function(nodeName){
            alert($auth.isAuthenticated());
            $http({
                url: 'http://'+address+':8080/nodes/create',
                method: 'POST',
                data: { name: nodeName }
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

        requestSetNodeScript: function(nodeId, script){
            $http({
                url: 'http://'+address+':8080/nodes/script',
                method: 'POST',
                data : {
                    nodeId: nodeId,
                    script: script
                }
            });
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
        }
    }
    return service;
}]);