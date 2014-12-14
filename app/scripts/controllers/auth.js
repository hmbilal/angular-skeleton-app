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
        .controller("RegisterController", function ($scope, $state, RegisterService) {

            $scope.credentials = {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                mobileNumber: '',
                addressONe: '',
                addressTwo: ''
            };

            $scope.register = function (credentials) {
                RegisterService.register(credentials).then(function (res) {
                    if (res) {
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