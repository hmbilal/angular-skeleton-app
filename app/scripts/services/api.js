(function () {
    'use strict';

    var apiService = angular.module("bzasa.services.api", []);

    apiService
        .factory("$points", [

            function () {
                return {
                    login: '/authenticate',
                    logout: '/authenticate/logout',
                    register: '/signup',
                    recover: '/authenticate/recover',
                    updateProfile: '/signup/update',
                    reloadProfile: '/profile/reload'
                };
            }])
        .service('$urls', ["$points", 'appconfig',
            function ($p, appconfig) {
                return {
                    login: appconfig.API_URI + $p.login,
                    logout: appconfig.API_URI + $p.logout,
                    register: appconfig.API_URI + $p.register,
                    recover: appconfig.API_URI + $p.recover,
                    updateProfile: appconfig.API_URI + $p.updateProfile,
                    reloadProfile: appconfig.API_URI + $p.reloadProfile
                };
            }]);
}());