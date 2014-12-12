(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name howlllApp.controller:DevController
     * @description
     * # DevController
     * Controller of the howlllApp
     */

    var devCtrl = angular.module("howlll.controllers.dev", []);

    devCtrl
        .controller("PeopleController", function () {

            var thisScope = this;
            thisScope.people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        })
        .controller("PeopleRecommendationsController", function () {

            var thisScope = this;
            thisScope.people = [1, 2, 3, 4, 5, 6, 7, 8];

        })
        .controller("GalleryWidgetController", function () {

            var thisScope = this;
            thisScope.pictures = [];

            thisScope.getPictures = function () {
                var i;
                for (i = 0; i < 19; i += 1) {
                    thisScope.pictures[i] = i;
                }
            };
            thisScope.getPictures();

        })
        .controller("PostsController", function () {

            var thisScope = this;
            thisScope.posts = [1, 2, 3, 4, 5, 6];

        });

}());