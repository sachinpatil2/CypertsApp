"use strict";

angular.module('CyberApp')
.controller('LoginController', ['$scope', '$state', '$rootScope','$http',function($scope,$state,$rootScope,$http) {
  console.log("inside HomeController");
  $scope.user = {};
  $scope.login= function(){
    console.log('in login function',$scope.user);
    $http.post('http://localhost:8081/login',$scope.user).
    then(function(response) {
          console.log("response",response);
          $scope.data = response.data;
          if($scope.data.success)
            $state.go('loginSuccess');
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
  }
}])
.controller('LoginSuccessController',function($state,$scope){
  console.log('in LoginSuccessController...');
})
.controller('RegisterController',function($scope,$state,$http){
  $scope.user = {};
  console.log("inside RegisterController..");

  $scope.register = function(){
    console.log('in register function',$scope.user);
    $http.post('http://localhost:8081/registerUser',$scope.user).
    then(function(response) {
          console.log("response",response);
          $scope.data = response.data;
          if($scope.data.otpSent)
            $state.go('sendOtp');
        }, function(response) {
      });
  }
})
.controller('OtpController',function($scope,$rootScope,$state,$http){
  console.log("inside OtpController..");
  $scope.user = {};
  $scope.registerOtp= function(){
    console.log('in register function',$scope.user);
    $http.post('http://localhost:8081/sendOtp',$scope.user).
    then(function(response) {
          console.log("response",response);
          $scope.data = response.data;
          if($scope.data.otp)
            $state.go('login');
        }, function(response) {
      });
  }

})
