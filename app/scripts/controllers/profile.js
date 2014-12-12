(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name bzasa.controller:ProfileController
     * @description
     * # ProfileController
     * Controller of the AngularJS Skeleton Application
     */

    var profileCtrl = angular.module("bzasa.controllers.profile", []);
    
    profileCtrl
        .controller("ProfileController", function ($scope, $state, $rootScope, $session, RegisterService) {

            $scope.userData = $session.getData('user');

            $scope.genderOptions = [{
                name: "Male",
                id: 1
            }, {
                name: "Female",
                id: 0
            }];

            $scope.user = {
                first_name: $scope.userData.firstName,
                last_name: $scope.userData.lastName,
                gender: (parseInt($scope.userData.gender) > 1) ? $scope.genderOptions[0] : $scope.genderOptions[1]
            };



            $scope.update = function (user) {
                RegisterService.update(user).then(function (res) {
                    if (res) {
                        $session.reloadUserProfile().then(function () {
                            $rootScope.$emit('userProfileUpdated', res);
                            $state.go('userProfile');
                        });
                    }
                }, function () {

                });
            };

        });

}());