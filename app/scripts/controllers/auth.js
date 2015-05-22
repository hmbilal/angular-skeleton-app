(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name bzasa.controller:AuthController
   * @description
   * # AuthController
   * Controller of the AngularJS Skeleton App
   */

  var authCtrl = angular.module("bzasa.controllers.auth", []);

  authCtrl
    .controller("LoginController", function ($scope, $state, $rootScope, appconfig, AuthService) {

      $scope.credentials = {
        email: '',
        password: ''
      };

      $scope.login = function (credentials) {
        AuthService.login(credentials).then(function (user) {
          $rootScope.$broadcast(appconfig.AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
          $state.go('home');
        }, function () {
          $rootScope.$broadcast(appconfig.AUTH_EVENTS.loginFailed);
        });
      };

    })
    .controller("RegisterController", function ($scope, $state, $localStorage, AuthService, RegisterService) {

      $scope.credentials = {
        email: '',
        password: '',
        name: ''
      };

      $scope.signup = function (credentials) {
        AuthService.signup(credentials).then(function (response) {
          console.log(response);
          if (res.status === 200) {
            $localStorage.token = res.token;
            $state.go('home');
          }
        }, function () {

        });
      };

    })
    .controller("RecoveryController", function ($scope, AuthService) {

      $scope.credentials = {
        email: ''
      };
      $scope.recover = function (credentials) {
        AuthService.recovery(credentials).then(function () {

        });
      };

    });

}());
