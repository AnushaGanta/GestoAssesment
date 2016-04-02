var gestoFood = angular.module('gestoFood', ['ngRoute', 'foodController', 'foodService', 'ng-backstretch', 'ngAlertify']);

gestoFood.config(function($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl : '../cart.html',
        controller  : 'mainController'
    })
    .when('/orders', {
      templateUrl : '../orders.html',
      controller  : 'orderController'
    })
});
