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
                first_name: '',
                last_name: '',
                gender: ''
            };

            $scope.genderOptions = [{
                name: "Male",
                id: 1
            }, {
                name: "Female",
                id: 0
            }];


            $scope.register = function (credentials) {
                RegisterService.register(credentials).then(function (res) {
                    if (res) {
                        $state.go('home');
                    }
                }, function () {

                });
            };

        })
        .controller("ForgotPasswordController", function ($scope, AuthService) {

            $scope.credentials = {
                email: ''
            };
            $scope.recovery = function (credentials) {
                AuthService.recovery(credentials).then(function () {

                });
            };

        });

}());