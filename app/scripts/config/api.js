(function () {
  'use strict';

  var apiService = angular.module("bzasa.config.api", []);

  apiService
    .service('$urls', function (appconfig) {
      return {
        login: appconfig.API_URI + '/authenticate',
        logout: appconfig.API_URI + '/authenticate/logout',
        signup: appconfig.API_URI + '/signup',
        recover: appconfig.API_URI + '/authenticate/recover',
        updateProfile: appconfig.API_URI + '/signup/update',
        reloadProfile: appconfig.API_URI + '/profile/reload'
      };
    });
}());
