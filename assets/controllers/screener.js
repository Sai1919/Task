angular.module('jobPortal').controller('Screener', ['$http', '$sce', function ($http, $sce) {
  this.currentCV = ""
  this.currentIndex = 0

  $http.get('/aplicants').success(function(data) {
    self.currentCV = data[0].resume
    var existingCV = $('#myFrame')
    if (existingCV) existingCV.remove()
    $('<iframe>', {
      src: self.currentCV,
      id:  'myFrame',
      frameborder: 0,
      scrolling: 'yes',
      width:1000,
      height: 500
    }).prependTo('#screener')
  })

  this.reject = function () {
    $http.put("/applicant", JSON.stringify(data[this.currentIndex])).success(function (data) {
      // need to properly handle not just logging
      console.log('updated successfully')
    })
  }

  this.accept = function () {
    $http.put("/applicant", JSON.stringify(data[this.currentIndex])).success(function (data) {
      // need to properly handle not just logging
      console.log('updated successfully')
    })
  }

  this.next = function () {
  	this.currentIndex = this.currentIndex + 1
    this.currentCV = $sce.trustAsResourceUrl(data[this.currentIndex].resume)
  }

  this.prev = function () {
  	this.currentIndex = this.currentIndex - 1
  	this.currentCV = $sce.trustAsResourceUrl(data[this.currentCV].resume)
  }
}])