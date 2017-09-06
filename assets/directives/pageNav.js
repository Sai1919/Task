angular.module("jobPortal").directive('pageNav', function(){
  return {
    replace: true,
    restrict: "E",
    templateUrl: "/directives/pageNav.html",
    controller: function($scope, $location){
      $scope.isPage = function(name){
        return new RegExp("/" + name + "($|/)").test($location.path());
      };
    }
  };
});