angular.module('jobPortal').controller('Aplicants', ['$http', function ($http) {
  this.canditates = []
  var self = this

  $http.get('/aplicants').success(function(data){
    self.canditates = data;
  });
}])