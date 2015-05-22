'use strict';

angular.module('bzasa.config', [])
  .constant('appconfig', {
    AUTH_PRE: '@@auth_pre',
    API_URI: '@@api',
    AUTH_EVENTS: {
        loginSuccess: '@@ae_loginSuccess',
        loginFailed: '@@ae_loginFailed',
        logoutSuccess: '@@ae_logoutSuccess',
        sessionTimeout: '@@ae_sessionTimeout',
        notAuthenticated: '@@ae_notAuthenticated',
        notAuthorized: '@@ae_notAuthorized'
    },
    USER_ROLES: {
        all: '@@r_all',
        admin: '@@r_admin',
        user: '@@r_user',
        guest: '@@r_guest'
    },
    ERRORS: {
        serviceUnavailable: '@@e_serviceUnavailable'
    }
  });
