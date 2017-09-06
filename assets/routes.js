angular.module('jobPortal').config(function ($routeProvider) {
  $routeProvider.when("/", {
    redirectTo: "/aplicants",
  })

  $routeProvider.when("/apply", {
    templateUrl: "/views/apply.html"
  })

  $routeProvider.when("/aplicants", {
    templateUrl: "/views/aplicants.html"
  })

  $routeProvider.when("/screener", {
    templateUrl: "/views/screener.html"
  })
});