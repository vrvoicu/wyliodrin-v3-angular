/**
 * Created by victor on 8/31/15.
 */

module.controller('gadgetController', function($scope, $auth, gadgetService){

    this.promise = null,

        $scope.createGadgetCategory = function(){

            var gadgetCategoryName = $scope.gadgetCategoryName;

            this.promise = gadgetService.requestCreateGadgetCategory(gadgetCategoryName);

        },

        $scope.createGadgetType = function(){

            var gadgetTypeName = $scope.gadgetTypeName;

            this.promise = gadgetService.requestCreateGadgetType(gadgetTypeName);

        },

        $scope.createGadget = function(){

            var gadgetName = $scope.gadgetName;
            var gadgetCategory = $scope.gadgetCategory;
            var gadgetType = $scope.gadgetType;

            this.promise = gadgetService.requestCreateGadget(gadgetName, gadgetType, gadgetCategory);
        },

        $scope.getGadgets = function () {

            this.promise = gadgetService.requestGetAllGadgets();

            this.promise.then(
                function (response) {

                },
                function (error) {

                }
            )
        },




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

                    $scope.entities = new Array();
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

                    $scope.blockSubcategories = new Array();
                    var data = jQuery.parseJSON(JSON.stringify(response.data));

                    $scope.blockSubcategories=data;
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

            alert(privacy);

            blockService.requestCreateBlock(category, subcategory, content, privacy);
        },

        $scope.getAllBlocks = function() {
            this.promise = blockService.requestGetAllBlocks();

            this.promise.then(
                function(response){
                    $scope.blocks = new Array();
                    /*var data= jQuery.parseJSON(JSON.stringify(response.data));

                     for(var index = 0; index < data.length; index++)
                     $scope.blocks.push(
                     data[index]
                     );*/

                    var data = jQuery.parseJSON(JSON.stringify(response.data));
                    for(var index = 0; index < data.length; index++)
                        $scope.blocks.push({
                            id: data[index]['id'],
                            category: data[index]['category']['name'],
                            subcategory: data[index]['subcategory']['name'],
                        });
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

module.service( 'gadgetService', [ '$auth', '$http', function($auth, $http) {

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