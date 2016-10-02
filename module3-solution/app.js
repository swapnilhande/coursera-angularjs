(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.factory('MenuSearchServiceFactory', MenuSearchServiceFactory)
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    }
  };

  return ddo;
};



NarrowItDownController.$inject = ['MenuSearchServiceFactory'];
function NarrowItDownController(MenuSearchServiceFactory) {
  var controller = this;
  var service = MenuSearchServiceFactory();
  controller.found = [];
  controller.getMatchedMenuItems = function() {
    var promise = service.getMatchedMenuItems();
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

function MenuSearchService() {
    var service = this;

    service.getMatchedMenuItems = function () {
      var response = $http({
        method: 'GET',
        URL: 'https://davids-restaurant.herokuapp.com/menu_items.json',
      });
      return response;
    }
};



function MenuSearchServiceFactory() {
  var factory = function () {
    return new MenuSearchService();
  };

  return factory;
}

})();
