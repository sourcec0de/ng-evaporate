'use strict';

var s3Url = 'https://'+aws_bucket+'.s3.amazonaws.com';
var app   = angular.module('upload',[]);

app.controller('UploadCtrl',['$scope',
    function($scope){

        var _e_ = new Evaporate({
            signerUrl: '/auth_upload',
            aws_key: aws_access_key,
            bucket: aws_bucket,
        });

        $scope.files = null;

        $('#files').change(function(evt) {

            $scope.files = [];

            var files = evt.target.files;

            for (var i = 0; i < files.length; i++){
                $scope.files.push(files[i]);
            }

            $scope.$apply();
            $scope.files.forEach(function(file){
                var fileKey = 'tmp/' + file.name;
                file.url = s3Url +'/'+ fileKey;

                console.log(file);

                if (file.type === '') {
                    file.type = 'binary/octel-stream';
                }

                file.started = Date.now();

                _e_.add({
                    name: fileKey,
                    file: file,
                    contentType: file.type,
                    xAmzHeadersAtInitiate: {
                        'x-amz-acl': 'public-read'
                    },
                    complete: function() {
                        file.completed = true;
                        $scope.$apply();
                    },
                    progress: function(progress) {

                        // returns percent / 100 with 2 decimal places I.E (10.00)
                        file.progress = (Math.round((progress * 100) * 100) / 100);

                        var currentTime            = Date.now();
                        var progressRemaining      = (100 - file.progress);
                        var progressionRate        = (progressRemaining / file.progress);
                        var timeToCurrentPosition  = (currentTime - file.started);

                        // return seconds left during download
                        file.timeLeft = Math.round((progressionRate * timeToCurrentPosition) / 1000);

                        $scope.$apply();
                    }
                });
            });
        });

    }
]);