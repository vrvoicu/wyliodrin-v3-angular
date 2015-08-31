/**
 * Created by victor on 8/27/15.
 */

module.controller('blockController', function($scope, $auth, blockService, $routeParams){

    this.page = 0;

    this.promise = null,

    $scope.createBlockCategory = function(){

        var blockCategoryName = $scope.blockCategoryName;

        this.promise = blockService.requestCreateBlockCategory(blockCategoryName);

        this.promise.then(
            function(answer){
                alert("done");
            },
            function(error){
                alert("There has been an error");
            }
        )
    },

    $scope.createBlockSubcategory = function(){

        var blockSubcategoryName = $scope.blockSubcategoryName;

        this.promise = blockService.requestCreateBlockSubcategory(blockSubcategoryName);

        this.promise.then(
            function(answer){
                alert("done");
            },
            function(error){
                alert("There has been an error");
            }
        )
    },

    $scope.getBlockCategories = function() {

        this.promise = blockService.requestGetBlockCategories();

        this.promise.then(
            function(response){

                var data = jQuery.parseJSON(JSON.stringify(response.data));
                $scope.entities=data;
            },
            function(error){
                alert("There has been an error");
            }
        )

    },

    $scope.getBlockSubcategories = function() {

        this.promise = blockService.requestGetBlockSubcategories();

        this.promise.then(
            function(response){

                var data = jQuery.parseJSON(JSON.stringify(response.data));
                $scope.entities = data;

            },
            function(error){
                alert("There has been an error");
            }
        )
    },

    $scope.createBlock=function() {

        var category = $scope.blockCategory;
        var subcategory = $scope.blockSubcategory;
        var content = $scope.blockContent;
        var privacy = $scope.blockPrivacy;

        blockService.requestCreateBlock(category, subcategory, content, privacy);
    },
        
        $scope.getBlock = function () {

            var entityId = $routeParams.entityId;

            var promise = blockService.requestGetBlock(entityId);

            promise.then(
                function (response) {

                    var data = jQuery.parseJSON(JSON.stringify(response.data));
                    $scope.masterEntity = data;

                }
            )

        },

    $scope.getAllBlocks = function() {
        this.promise = blockService.requestGetAllBlocks();

        this.promise.then(
            function(response){
                $scope.entities = new Array();

                var data = jQuery.parseJSON(JSON.stringify(response.data));
                $scope.entities = data;

            },
            function(error){
                alert("There has been an error");
            }
        )
    },

    $scope.deleteBlockById = function(blockId) {

        this.promise = blockService.requestDeleteBlockById(blockId);

        this.promise.then(
            function(answer){
                 $scope.blocks = new Array();
                 var data = answer.data;

                 for(var index = 0; index < data.length; index++)
                 $scope.blockSubcategories.push(
                 {name: data[index]}
                 );
            },
            function(error){
                alert("There has been an error");
            }
        )

    },

    $scope.deleteAllBlocks = function(){

        this.promise = blockService.requestDeleteAllBlocks();

        this.promise.then(
            function(answer){
                /* $scope.blockSubcategories = new Array();
                 var data = answer.data;

                 for(var index = 0; index < data.length; index++)
                 $scope.blockSubcategories.push(
                 {name: data[index]}
                 );*/
            },
            function(error){
                alert("There has been an error");
            }
        )

    }

})

module.service( 'blockService', [ '$auth', '$http', function($auth, $http) {

    var service = {

        requestCreateBlockCategory: function (blockCategoryName){
            return $http({
                url: 'http://' + address + '/blocks/createBlockCategory',
                method: 'POST',
                data: {
                    blockCategoryName: blockCategoryName
                }
            })
        },

        requestCreateBlockSubcategory: function (blockSubcategoryName){
            return $http({
                url: 'http://' + address + '/blocks/createBlockSubcategory',
                method: 'POST',
                data: {
                    blockSubcategoryName: blockSubcategoryName
                }
            })
        },

        requestGetBlockCategories: function () {
            return $http({
                url: 'http://' + address + '/blocks/getBlockCategories',
                method: 'GET',
                data: {}
            })
        },

        requestGetBlockSubcategories: function () {
            return $http({
                url: 'http://' + address + '/blocks/getBlockSubcategories',
                method: 'GET',
                data: {}
            })
        },

        requestCreateBlock: function (blockCategory, blockSubcategory, blockContent, blockPrivacy) {
            return $http({
                url: 'http://' + address + '/blocks/createBlock',
                method: 'POST',
                data: {
                    blockCategory: blockCategory,
                    blockSubcategory: blockSubcategory,
                    blockContent: blockContent,
                    blockPrivacy: blockPrivacy
                }
            })
        },
        
        requestGetBlock: function (blockId) {
            return $http({
                url : "http://"+address+"/blocks/getBlock/"+blockId,
                method: 'GET'
            })
        },

        requestGetAllBlocks: function () {
            return $http({
                url: 'http://' + address + '/blocks/getAllBlocks',
                method: 'GET',
                //data: {}
            })
        },

        requestDeleteBlockById: function (blockId) {
            return $http({
                url: 'http://' + address + '/blocks/deleteBlockById',
                method: 'POST',
                data: {
                    blockId: blockId
                }
            })
        },

        requestDeleteAllBlocks: function () {
            return $http({
                url: 'http://' + address + '/blocks/deleteAllBlocks',
                method: 'POST',
                data: {}
            })
        }
    }

    return service;
}]);