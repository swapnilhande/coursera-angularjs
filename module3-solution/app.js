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
      onRemove: '&',
      myList: '=myList'
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
    var promise = MenuSearchService.getMatchedMenuItems();
    promise.then(function(response){
      var data = response.data;
      console.log(data);
      for(var i=0; i< data.menu_items.length; i++) {
        controller.found.push(data.menu_items[i]);
      }
      //controller.found = data;
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
