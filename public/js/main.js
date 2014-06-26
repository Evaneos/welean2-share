var app = angular.module('picanoo', ['justifydiv', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('new', {
        url: "/",
        templateUrl: "template/new",
        controller: function($scope, $state, $http) {
            $scope.create = function(title) {
                console.log(title);

                $http.get('/new', {params: {title: title}}).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $state.transitionTo('album', {albumId: data._id, title: data.title});
                }).
                error(function(data, status, headers, config) {

                });

            }
        }
    })
    .state('album', {
        url: "/album/:albumId/:title",
        templateUrl: "template/album",
        controller: function($scope, $state, $stateParams, $http) {

            $http.get('/get', {params: {id: $stateParams.albumId, title: $stateParams.title}}).
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.album = data;
            }).
            error(function(data, status, headers, config) {
                $state.transitionTo('new');
            });
        }
    });

    $urlRouterProvider.otherwise("/");

});

app.controller("AppCtrl", ['$scope', function($scope) {
    $scope.medias = [];
    $scope.files = [];
    $scope.isnew = true;
    $scope.progress = 0;

    $scope.setData  = function(data) {
        console.log(data);
        $scope.isnew = data.isnew;
        $scope.error = data.error;
        $scope.medias = data.files;
        return;
    }


    $scope.thumbnail = function(file, dataUrl) {
    }

    $scope.added = function(file) {
    }.bind(this);
    var app = this;

}]);

app.directive('medias', function() {
    return {
        link: function(scope, element, attr, ctrl) {
            if (scope.setData) {
                var data = (element[0].innerHTML);
                scope.setData(angular.fromJson(data));
            } else {
                console.log("Scope has no setData");
            }
        }
    }
});

app.directive('pMedia', function() {
    return {
        template: '\
            <div class="dj-child-container thumbnail">\
                <a  rel="slideshow" href="{{media.thumbnails.slideshow.path}}">\
                    <img class="dj-child" data-width="{{media.thumbnails.miniature.size.width}}" \
                    data-height="{{media.thumbnails.miniature.size.height}}" data-dz-thumbnail \
                    alt="{{media.name}}" src="{{media.thumbnails.miniature.path}}" style="width:{{media.thumbnails.miniature.size.width}}px; height:{{media.thumbnails.miniature.size.height}}px;" />\
                </a>\
                <div class="dz-progress" data-dz-uploadprogress style="width:{{media.upload.progress}}%"><span class="dz-upload"></span></div>\
            </div>',
        scope: {
        media: '='
        },
    };
});

app.directive('pSlideshow', function() {
    return {
        link: function(scope, element, attr, ctrl) {

            $(element).find('a').fancybox({
                helpers : {
                    overlay : {
                        css : {
                            'background' : 'rgba(0, 0, 0, 0.8)'
                        }
                    }
                },
                padding : 0,
            });

        }
    }
});