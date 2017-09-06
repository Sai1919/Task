angular.module('jobPortal').controller('Apply', ['$http', function ($http) {
  this.applicant = {
    name: "",
    phone: "",
    email: "",
    resume: ""
  }
  this.submitApplication = function () {
    var myElement = angular.element( document.querySelector( '#link' ) )
    this.applicant.resume = myElement.val()
    $http.post('/applicant', JSON.stringify(this.applicant)).success(function () {
      return
    })
  }
}])