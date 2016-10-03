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
    }
  };

  return ddo;
};



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;
  controller.searchTerm = "";
  controller.found = [];
  controller.getMatchedMenuItems = function() {
    console.log("clicked");
    console.log(controller.found);
    var promise = MenuSearchService.getMatchedMenuItems();
    promise.then(function(response){
      var data = response.data;
      controller.found = data;
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
