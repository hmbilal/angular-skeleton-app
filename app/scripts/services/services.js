(function () {
  'use strict';
  angular.module("bzasa.services", [])
    .factory('HttpInterceptor', function ($rootScope, $q, $localStorage, localStorageService,
                                          $notification, appconfig) {
      return {
        request: function (config) {

          config.headers = config.headers || {};
          if ($localStorage.token) {
            config.headers.Authorization = appconfig.AUTH_PRE + $localStorage.token;
          }
          return config;

        },
        requestError: function (rejection) {
          return $q.reject(rejection);
        },
        response: function (response) {
          if (response.data.title && response.data.content) {
            $notification.success(response.data.title, response.data.content);
          }
          return response;
        },
        responseError: function (response) {

          if (response.status === 401 || response.status === 403) {
            $location.path('/signin');
          }

          $rootScope.$broadcast({
            401: appconfig.AUTH_EVENTS.notAuthenticated,
            403: appconfig.AUTH_EVENTS.notAuthorized,
            419: appconfig.AUTH_EVENTS.sessionTimeout,
            440: appconfig.AUTH_EVENTS.sessionTimeout,
            503: appconfig.ERRORS.serviceUnavailable
          }[response.status], response);

          return $q.reject(response);
        }
      };
    });

}());
