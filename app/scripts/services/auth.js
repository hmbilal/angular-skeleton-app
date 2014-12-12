(function () {
    'use strict';

    var authService = angular.module("bzasa.services.auth", []);

    authService
        .service('$session', function (localStorageService, appconfig, $http, $urls) {

            this.user = null;
            var thisScope = this;

            this.create = function (sessionId, id, user) {
                localStorageService.set('token', sessionId);
                localStorageService.set('id', parseInt(id.substring(id.length - 1), 10));
                localStorageService.set('user', user);
                this.user = user;
            };

            this.destroy = function () {
                this.user = null;
                this.clearStorage();
            };

            this.checkSession = function () {
                var user = localStorageService.get('user');
                if (user) {
                    this.user = user;
                    return true;
                }
                return false;
            };

            this.getData = function (key) {
                return localStorageService.get(key);
            };

            this.setData = function (key, data) {
                localStorageService.set(key, data);
            };

            this.clearStorage = function () {
                localStorageService.clearAll();
            };

            this.reloadUserProfile = function () {
                return $http
                    .post($urls.reloadProfile)
                    .then(function (res) {
                        thisScope.create(res.data.session, res.data.data.id,
                            res.data.data.user);
                        return res.data.data;
                    });
            };

            return this;
        })
        .factory('AuthService', function ($http, $session, $rootScope, $urls,
            localStorageService, appconfig) {
            var authService = {};

            authService.login = function (credentials) {

                return $http
                    .post($urls.login, credentials)
                    .then(function (res) {
                        $session.create(res.data.session, res.data.data.id,
                            res.data.data.user);
                        $rootScope.$broadcast(appconfig.AUTH_EVENTS.loginSuccess);
                        return res.data.data;
                    });
            };

            authService.logout = function () {
                return $http
                    .post($urls.logout)
                    .then(function (res) {
                        if (res.data.status === 'success') {
                            $session.destroy();
                            $rootScope.$broadcast(appconfig.AUTH_EVENTS.logoutSuccess);
                        }
                    });
            };

            authService.recovery = function (credentials) {

                return $http
                    .post($urls.recover, credentials)
                    .then(function (res) {
                        return true;
                    });
            };

            authService.destroy = function () {
                $session.destroy();
            };

            authService.isAuthenticated = function () {
                return ($session.user && (!!$session.user.userId || ($session.user.userRole === appconfig.USER_ROLES.guest)));
            };

            authService.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }

                return ($session.user && authService.isAuthenticated() &&
                    authorizedRoles.indexOf($session.user.userRole) !== -1);
            };

            return authService;
        })
        .factory('RegisterService',
            function ($http, $rootScope, $urls) {
                var registerService = {};

                registerService.register = function (credentials) {
                    return $http
                        .post($urls.register, credentials)
                        .then(function (res) {
                            if (res.data.code === 200) {
                                return true;
                            }
                        });
                };
                registerService.update = function (user) {
                    return $http
                        .post($urls.updateProfile, user)
                        .then(function (res) {
                            if (res.data.code === 200) {
                                return res.data.data;
                            }
                        });
                };

                return registerService;
            });

}());