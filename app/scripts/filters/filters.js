(function () {
    'use strict';
    angular.module('bzasa.filters', [])
        .filter('rawHtml', function ($sce) {
            return function (val) {
                return $sce.trustAsHtml(val);
            };
        });
}());
