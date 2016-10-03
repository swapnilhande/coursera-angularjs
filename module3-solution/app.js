(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundMenuItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;
  list.isEmpty = function() {
    return list.foundMenuItems === undefined || list.foundMenuItems.length ==0;
  }

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;
  controller.searchTerm = "";
  controller.getMatchedMenuItems = function() {
    controller.found = [];
    if (controller.searchTerm.trim() == "") {
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems();
    promise.then(function(response){

      var data = response.data;
      for(var i=0; i< data.menu_items.length; i++) {
        var item = data.menu_items[i];
        if (item.description.toLowerCase().indexOf(controller.searchTerm) !== -1) {
          controller.found.push(item);
       }
      }
    })
    .catch(function(error){
      console.log(error);
    })
    };

    controller.removeItem = function (itemIndex) {
      controller.found.splice(itemIndex, 1);
  };
};

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function () {
      var response = $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
      });
      return response;
    }
};

})();
