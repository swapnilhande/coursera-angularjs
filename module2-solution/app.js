(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.itemsToBuy = ShoppingListCheckOffService.itemsToBuy();
  toBuy.itemBought = function(itemIndex) {
      ShoppingListCheckOffService.itemBought(itemIndex);
    };
};

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var bought = this;
  bought.itemsBought = ShoppingListCheckOffService.itemsBought();
};

function ShoppingListCheckOffService() {
    var service = this;
    var toBuy = [
      {
        name: "Cookies",
        quantity: "10 bags"
      },
      {
        name: "Chips",
        quantity: "5 bags"
      },
      {
        name: "Sodas",
        quantity: "3 Bottles"
      },
      {
        name: "Muffins",
        quantity: "3 bags"
      },
      {
        name: "Party cups",
        quantity: "2 bags"
      }
    ];
    var bought = [];
    service.itemBought = function(itemIndex) {
      bought.push(toBuy[itemIndex]);
      toBuy.splice(itemIndex, 1);
    };

    service.itemsToBuy = function() {
      return toBuy;
    };

    service.itemsBought = function() {
      return bought;
    }
};

})();
