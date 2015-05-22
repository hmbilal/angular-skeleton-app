'use strict';

angular.module('bzasa.config', [])
  .constant('appconfig', {
    AUTH_PRE: 'Bearer ',
    API_URI: 'http://laravel.local/v1',
    AUTH_EVENTS: {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    },
    USER_ROLES: {
        all: '*',
        admin: 'admin',
        user: 'user',
        guest: 'guest'
    },
    ERRORS: {
        serviceUnavailable: 'serviceUnavailable'
    }
  });
