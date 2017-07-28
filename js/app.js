"use strict";

var app = angular.module('CyberApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
			      controller: "LoginController"
        })
        .state('register', {
          url: '/register',
          templateUrl: 'templates/register.html',
          controller: "RegisterController"
        })
        .state('otp', {
          url: '/otp',
          templateUrl: 'templates/otp.html',
          controller: "OtpController"
        })
        .state('loginSuccess', {
          url: '/loginSuccess',
          templateUrl: 'templates/loginSuccess.html',
          controller: "LoginSuccessController"
        })


      $urlRouterProvider.otherwise('/login');
});
