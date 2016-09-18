(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.message = "";
  $scope.color="";
  $scope.checkIfTooMuch = function () {
    var dishes = $scope.dishes;
    $scope.color="green";
    if (dishes == "") {
      $scope.message= "Please enter data first";
      $scope.color="red";
    } else if (calculateItems(dishes) <= 3) {
      $scope.message= "Enjoy!";
    } else {
      $scope.message= "Too much!";
    }
  };
};

function calculateItems(items) {
    var itemsArray = items.split(",");
    return itemsArray.length;
};

})();
