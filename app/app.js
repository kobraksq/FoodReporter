var reportFoodApp = angular.module('reportFoodApp', [
  'ngRoute',
  'reportFoodControllers',
  'reportFoodServices'
]);

//Allow cross domain requests
reportFoodApp.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

reportFoodApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/food', {
        templateUrl: 'partials/food-list.html',
        controller: 'FoodListCtrl'
      }).
      when('/food/:foodId', {
        templateUrl: 'partials/food-detail.html',
        controller: 'FoodDetailCtrl'
      }).
      otherwise({
        redirectTo: '/food'
      });
  }]);

