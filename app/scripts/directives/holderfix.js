(function () {
  'use strict';
  angular.module('bzasa.directives.holderfix', [])
    .directive('holderJsFix', function () {
      return {
        link: function (scope, element, attrs) {
          Holder.run({
            images: element[0],
            nocss: true
          });
        }
      };
    });
}());
