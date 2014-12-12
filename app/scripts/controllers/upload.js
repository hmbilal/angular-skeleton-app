(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name howlllApp.controller:UploadController
     * @description
     * # UploadController
     * Controller of the howlllApp
     */

    var uploadCtrl = angular.module("howlll.controllers.upload", []);

    uploadCtrl
        .controller("FileUploadCtrl", function ($scope, $session, $rootScope) {

            var dropbox = document.getElementById("dropbox"),
                target = dropbox.getAttribute('data-type'),
                path = 'http://api.howlll.local/v1/authenticate/upload';
            $scope.dropText = 'Drop files here...';
            $scope.updatedFilePath = null;
            $scope.fileName = null;


            if (target === 'dream') {
                path = 'http://api.howlll.local/v1/authenticate/upload';
            }


            function dragEnterLeave(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                $scope.$apply(function () {
                    $scope.dropText = 'Drop files here...';
                    $scope.dropClass = '';
                });
            }


            dropbox.addEventListener("dragenter", dragEnterLeave, false);
            dropbox.addEventListener("dragleave", dragEnterLeave, false);
            dropbox.addEventListener("dragover", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var clazz = 'not-available',
                    ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
                $scope.$apply(function () {
                    $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!';
                    $scope.dropClass = ok ? 'over' : 'not-available';
                });
            }, false);


            dropbox.addEventListener("drop", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                $scope.$apply(function () {
                    $scope.dropText = 'Drop files here...';
                    $scope.dropClass = '';
                });
                var files = evt.dataTransfer.files,
                    i;
                if (files.length > 0) {
                    $scope.$apply(function () {
                        $scope.files = [];
                        for (i = 0; i < files.length; i += 1) {
                            $scope.files.push(files[i]);
                        }
                    });
                }
            }, false);



            $scope.setFiles = function (element) {
                $scope.$apply(function ($scope) {
                    var i;
                    $scope.files = [];
                    for (i = 0; i < element.files.length; i += 1) {
                        $scope.files.push(element.files[i]);
                    }
                    $scope.progressVisible = false;
                    $scope.uploadFile();
                });
            };



            $scope.uploadFile = function () {
                var fd = new FormData(),
                    i,
                    xhr = new XMLHttpRequest();

                for (i in $scope.files) {
                    if ($scope.files.hasOwnProperty(i)) {
                        fd.append("uploadedFile", $scope.files[i]);
                    }
                }

                xhr.upload.addEventListener("progress", uploadProgress, false);
                xhr.addEventListener("load", uploadComplete, false);
                xhr.addEventListener("error", uploadFailed, false);
                xhr.addEventListener("abort", uploadCanceled, false);
                xhr.open("POST", path);
                xhr.setRequestHeader('Authorization', 'Bearer ' + $session.getData('token'));
                $scope.progressVisible = true;
                xhr.send(fd);
            };


            function uploadProgress(evt) {
                $scope.$apply(function () {
                    if (evt.lengthComputable) {
                        $scope.progress = Math.round(evt.loaded * 100 / evt.total);
                    } else {
                        $scope.progress = 'unable to compute';
                    }
                });
            }



            function uploadComplete(evt) {
                var response = angular.fromJson(evt.target.responseText);

                if (response.status === 'success') {
                    $scope.$apply(function () {
                        var e, $e;
                        $scope.updatedFilePath = response.filepath;
                        $scope.progressVisible = false;
                        $scope.files = [];
                        $scope.successDescription = response.message;
                        $scope.errorDescription = null;
                        e = document.getElementById("dream-image");
                        //e.value = response.filename;
                        $e = angular.element(e);
                        $e.triggerHandler('input');
                    });
                } else {
                    $scope.$apply(function () {
                        $scope.successDescription = null;
                        $scope.errorDescription = response.errorDescription;
                        $scope.progressVisible = false;
                        $scope.files = [];
                    });
                }

                $rootScope.$emit('userProfileUpdated', null);

            }


            function uploadFailed(evt) {
                $scope.$apply(function () {
                    $scope.successDescription = null;
                    $scope.errorDescription = "There was an error attempting to upload the file.";
                    $scope.progressVisible = false;
                    $scope.files = [];
                });
            }



            function uploadCanceled(evt) {
                $scope.$apply(function () {
                    $scope.progressVisible = false;
                    $scope.successDescription = null;
                    $scope.errorDescription = "There was an error attempting to upload the file.";
                    $scope.progressVisible = false;
                    $scope.files = [];
                });
            }
        });

}());