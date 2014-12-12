(function () {
    'use strict';
    angular.module("bzasa.services", [])
        .factory('HttpInterceptor', function ($rootScope, $q, localStorageService,
            $notification, appconfig) {
            return {
                request: function (config) {
                    var user = localStorageService.get('user');
                    if (config.data && user) {
                        config.data.id = localStorageService.get('id');
                        config.data.userId = user.userId;
                    } else if (user) {
                        config.data = {
                            id: localStorageService.get('id'),
                            userId: user.userId
                        };
                    }
                    
                    config.headers.Authorization = appconfig.AUTH_PRE + localStorageService.get('token');
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
                    if (response.data.title && response.data.content) {
                        $notification.error(response.data.title, response.data.content);
                    }
                    $rootScope.$broadcast({
                        401: appconfig.AUTH_EVENTS.notAuthenticated,
                        403: appconfig.AUTH_EVENTS.notAuthorized,
                        419: appconfig.AUTH_EVENTS.sessionTimeout,
                        440: appconfig.AUTH_EVENTS.sessionTimeout
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        });

}());