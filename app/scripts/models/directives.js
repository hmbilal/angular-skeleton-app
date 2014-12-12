(function () {
    'use strict';
    angular.module('bzasa.directives', [])
        .directive('bgColor', function () {
            return function (scope, element, attrs) {
                var bgColorCode = attrs.bgColor;
                element.css({
                    'background-color': bgColorCode
                });
            };
        })
        .directive('holderJsFix', function () {
            return {
                link: function (scope, element, attrs) {
                    Holder.run({
                        images: element[0],
                        nocss: true
                    });
                }
            };
        })
        .directive('formAutofillFix', function ($timeout) {
            return function (scope, element, attrs) {
                element.prop('method', 'post');
                if (attrs.ngSubmit) {
                    $timeout(function () {
                        element
                            .unbind('submit')
                            .bind('submit', function (event) {
                                event.preventDefault();
                                element
                                    .find('input, textarea, select')
                                    .trigger('input')
                                    .trigger('change')
                                    .trigger('keydown');
                                scope.$apply(attrs.ngSubmit);
                            });
                    });
                }
            };
        });


}());