(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name bzasa.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the AngularJS Skeleton Application
     */

    var mainCtrl = angular.module("bzasa.controllers.main", []);
    
    mainCtrl
        .controller("MainController", function ($scope, $http, $state, $rootScope,
            $location, $stateParams, $session, appconfig, AuthService) {

            $scope.currentUser = $session.user;
            $scope.userRoles = appconfig.USER_ROLES;
            $scope.isAuthorized = AuthService.isAuthorized;

            $scope.setCurrentUser = function (user) {
                $scope.currentUser = user;
            };
            $scope.logout = function () {
                AuthService.logout();
                $scope.setCurrentUser(null);
            };
            $scope.checkSession = function () {
                if ($session.checkSession()) {
                    $scope.setCurrentUser($session.user);
                } else {
                    $state.go('home');
                }
            };
            $scope.checkSession();

            $rootScope.$on("userProfileUpdated", function (event, data) {
                $session.reloadUserProfile().then(function () {
                    $scope.setCurrentUser($session.user);
                });
            });

        });
        
}());