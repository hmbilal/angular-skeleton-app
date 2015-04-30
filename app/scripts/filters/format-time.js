(function () {
    'use strict';
    angular.module('bzasa.filters.formatTime', [])
        .filter('formatTime', function () {
            return function (date) {
                var seconds = Math.floor(((new Date().getTime() / 1000) - date)),
                    interval = Math.floor(seconds / 31536000),
                    dateFormat = new Date(date * 1000),
                    monthNames = ["January", "February", "March", "April", "May", "June",
                                      "July", "August", "September", "October", "November", "December"];

                if (interval > 1) {
                    return interval + " year";
                }

                interval = Math.floor(seconds / 2592000);
                if (interval > 1) {
                    return monthNames[dateFormat.getMonth()] + ' ' + dateFormat.getDate() + ', ' + dateFormat.getFullYear();
                }

                interval = Math.floor(seconds / 86400);
                if (interval >= 1 && interval < 4) {
                    return interval + "d ago";
                }

                if (interval > 3) {
                    return monthNames[dateFormat.getMonth()] + ' ' + dateFormat.getDate() + ', ' + dateFormat.getFullYear();
                }

                interval = Math.floor(seconds / 3600);
                if (interval > 1) {
                    return interval + " hrs ago";
                }

                if (interval === 1) {
                    return interval + " hr ago";
                }

                interval = Math.floor(seconds / 60);
                if (interval > 1) {
                    return interval + ' mins ago';
                }

                return "a few seconds ago";
            };
        });

}());
