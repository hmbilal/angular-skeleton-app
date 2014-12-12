(function () {
    'use strict';
    var
    //the HTTP headers to be used by all requests
        httpHeaders,
        //the message to be shown to the user
        message,
        app = angular.module('bzasa', [
            'ui.router',
            'ngResource',
            'ngAnimate',
            'angular-loading-bar',
            'ngRoute',
            'ui.bootstrap',
            'LocalStorageModule',
            'bzasa.configuration',
            'bzasa.controllers.main',
            'bzasa.controllers.auth',
            'bzasa.controllers.profile',
            'bzasa.notifications',
            'bzasa.directives',
            'bzasa.filters',
            'bzasa.services',
            'bzasa.services.api',
            'bzasa.services.auth'
        ])
        .value('version', '1.0.0')
        .config(function ($routeProvider, $locationProvider, $stateProvider,
            $urlRouterProvider, $httpProvider, appconfig) {

            $stateProvider
                .state('home', {
                    url: '/',
                    data: {
                        authorizedRoles: [appconfig.USER_ROLES.guest, appconfig.USER_ROLES.user, appconfig.USER_ROLES.admin]
                    }
                })
                .state('logout', {
                    url: '/logout',
                    data: {
                        authorizedRoles: [appconfig.USER_ROLES.user, appconfig.USER_ROLES.admin]
                    }
                })
                .state('forgot', {
                    url: '/recovery',
                    templateUrl: 'views/login/forgot.html',
                    data: {
                        authorizedRoles: [appconfig.USER_ROLES.guest]
                    }
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'views/login/signup.html',
                    data: {
                        authorizedRoles: [appconfig.USER_ROLES.guest]
                    }
                });

            $urlRouterProvider.otherwise('/');

            $httpProvider.interceptors.push('HttpInterceptor');

        })
        .run(function ($rootScope, $window, appconfig, AuthService) {

            //AuthService.logout();
            $rootScope.$on('$stateChangeStart', function (event, next) {

                var authorizedRoles = next.data.authorizedRoles;
                if (!AuthService.isAuthorized(authorizedRoles)) {

                    event.preventDefault();
                    if (AuthService.isAuthenticated()) {
                        // user is not allowed
                        $rootScope.$broadcast(appconfig.AUTH_EVENTS.notAuthorized);
                    }/* else {
                        // user is not logged in
                        $rootScope.$broadcast(appconfig.AUTH_EVENTS.notAuthenticated);
                    }*/
                }

            });

            $rootScope.$on(appconfig.AUTH_EVENTS.notAuthenticated, function (event) {
                AuthService.destroy();
                $window.location.reload();
            });

        });

}());