angular.module('jobPortal').controller('Screener', ['$http', function ($http) {
  this.currentCV = ""
  this.currentIndex = 0
  var self = this
  this.disableNext = false
  this.disablePrev = true

  $http.get('/aplicants').success(function(data) {
    self.currentCV = data[0].resume
    self.data = data
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
    self.data[this.currentIndex].status = 'Rejected'
    $http.put("/applicant/status", JSON.stringify(self.data[this.currentIndex])).success(function (data) {
      // need to properly handle not just logging
      console.log('updated successfully')
    })
  }

  this.accept = function () {
    self.data[this.currentIndex].status = 'Accepted'
    $http.put("/applicant/status", JSON.stringify(self.data[this.currentIndex])).success(function (data) {
      // need to properly handle not just logging
      console.log('updated successfully')
    })
  }

  this.next = function () {
  	this.currentIndex = this.currentIndex + 1
    if (this.currentIndex >= 1) {
      this.disablePrev = false 
    } else {
      this.disablePrev = true 
    }
    if (this.data.length === this.currentIndex) this.disableNext = true
    this.currentCV = this.data[this.currentIndex].resume
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
  }

  this.prev = function () {
  	this.currentIndex = this.currentIndex - 1
  	this.currentCV = this.data[this.currentIndex].resume
    if (this.currentIndex !== this.data.length) this.disableNext = false
    if (this.currentIndex === 0) this.disablePrev = true
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
  }
}])