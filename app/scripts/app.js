'use strict';

/**
 * @ngdoc overview
 * @name mainApp
 * @description
 * # mainApp
 *
 * Main module of the application.
 */
var app = angular
  .module('mainApp', ['main']);
  /*.config(function ($routeProvider) {
    $routeProvider
      .when('/displays', {

        controller: 'DisplayCtrl',
        templateUrl: 'display.html',
        controllerAs: 'display'
      })
      .when('/media', {

        controller: 'MediaCtrl',
        templateUrl: 'media.html',
        controllerAs: 'media'
      })
      .when('/widgets', {

        controller: 'WidgetsCtrl',
        templateUrl: 'widgets.html',
        controllerAs: 'widgets'
      })
      .when('/campaigns', {

        controller: 'CampaignsCtrl',
        templateUrl: 'campaigns.html',
        controllerAs: 'campaigns'
      })
      .when('/scheduler', {

        controller: 'SchedulerCtrl',
        templateUrl: 'schedulers.html',
        controllerAs: 'scheduler'
      })
      .otherwise({
        redirectTo: '/displays'
      });
  });*/
  app.controller('Menuctrl', function ($scope, $state, $mdMedia, $mdDialog) {
    $scope.state = "display";
    angular.element('.main-menu').click(function () {
    angular.element('.main-menu').removeClass('active');
    angular.element(this).addClass('active');
  });

  $scope.newEvent = function(ev) {
        //code for popup arrival on new button
        // console.log($scope.items);
        var useFullScreen = ($mdMedia('xs')) && $scope.customFullscreen;
        if ($scope.state === "display") {
            $mdDialog.show({
                parent: angular.element(document.body),
                templateUrl: 'views/newDisplay.html',
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                controller: DialogController,
                 onComplete: afterShowAnimation
            });
            $scope.$watch(function() {
                return $mdMedia('xs');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
            function afterShowAnimation(){
              //Initialize map
                initmap();
                 function initmap() {
                    var marker, map, path, myIcon;
                    marker = {
                        "name": 'test', //$window.localStorage.getItem('locationName'),
                        "lat": '17.3700',
                        "lng": '78.4800'
                    };
                    map = L.map('map', {
                        attributionControl: false,
                        center: [marker.lat, marker.lng],
                        zoom: 5,
                        zoomControl: false
                    });
                    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
                        maxZoom: 18,
                        id: 'mapbox.streets'
                    }).addTo(map);
                    L.Icon.Default.imagePath = '/images';
                    path = L.Icon.Default.imagePath;
                    if (!path) {
                        throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
                    }
                    myIcon = L.icon({
                        iconUrl: 'images/iconCurrentLocationGreen.png',
                        iconSize: [25, 25],
                        iconAnchor: [15, 20]
                    });
                    L.marker([marker.lat, marker.lng], {
                            icon: myIcon
                        })
                        .bindPopup('<a href="#" target="_blank">' + marker.name + '</a>')
                        .addTo(map);
                }
            }

            function DialogController($scope, $mdDialog) {
                //Initialize map
                // initmap();
                $scope.items = [{
                    imgNum: 1
                }, {
                    imgNum: 2
                }, {
                    imgNum: 3
                }, {
                    imgNum: 4
                }, {
                    imgNum: 5
                }];
                $scope.states = [{
                    abbrev: "landscape"
                }, {
                    abbrev: "portrait"
                }];
                console.log($scope.items);
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
                $scope.selectTheme=function($event){
                  console.log("enet");
                  angular.element('.md-card-image').removeClass('selected-theme');
                  angular.element('.theme-active').removeClass('active-theme');
        angular.element($event.target).addClass("selected-theme");
        angular.element($event.target.parentElement.childNodes[1]).addClass("active-theme");
                };



            }
        } else {
            $mdDialog.show({
                controller: DialogMediaController,
                templateUrl: 'views/newMedia.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
            });
            $scope.$watch(function() {
                return $mdMedia('xs');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });

            function DialogMediaController($scope, $mdDialog, fileUpload) {
                $scope.uploadFile = function() {
                    var file = $scope.myFile;
                    console.log('file is ');
                    console.dir(file);
                    var uploadUrl = "/fileUpload";
                    fileUpload.uploadFileToUrl(file, "http://www.megafileupload.com/");
                };
                $scope.items = [{
                    imgNum: 1
                }, {
                    imgNum: 2
                }, {
                    imgNum: 3
                }, {
                    imgNum: 4
                }, {
                    imgNum: 5
                }];
                $scope.states = [{
                    abbrev: "landscape"
                }, {
                    abbrev: "portrait"
                }];
                console.log($scope.items);
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }
        }

    };

    $scope.breadcrumb = 'displays';
    $scope.displayNavigation = function(path) {
        $scope.state = "display";
        $scope.breadcrumb = path;
        $state.go(path);
    };
    $scope.mediaNavigation = function(path) {
        $scope.state = "media";
        $scope.breadcrumb = path;
      $state.go(path);
    };
    $scope.widgetsNavigation = function(path) {
        $scope.state = "widget";
        $scope.breadcrumb = path;
      $state.go(path);
    };
    $scope.campaignsNavigation = function(path) {
        $scope.state = "campaign";
        $scope.breadcrumb = path;
      $state.go(path);
    };
    $scope.schedulerNavigation = function(path) {
        $scope.state = "schedule";
        $scope.breadcrumb = path;
      $state.go(path);
    };

  });
app.run(function($rootScope){
  $rootScope.$on('$routeChangeStart', function(event, nextUrl, currentUrl){
    console.log(nextUrl);
    console.log(currentUrl);
    // Here you can take the control and call your own functions:
    // alert('Sorry ! Back Button is disabled');
    // Prevent the browser default action (Going back):
    // event.preventDefault();
  });
  });
app.config(function($httpProvider){
  // Here we're adding our interceptor.
  $httpProvider.interceptors.push('httpInterceptor');
});
app.factory('httpInterceptor',['$q','$rootScope',function ($q,$rootScope) {
      $rootScope.ajaxProgress=0;
        return {
            'request': function (config) {

              if(!config  || !(config.customObj) || config.customObj.hideBlockingUi!==true){
                $rootScope.ajaxProgress++;
              }

              //intersept your ajax calls here.
               return config || $q.when(config);
            },
            'response': function(response,config) {
              if(!(response.config.customObj) || response.config.customObj.hideBlockingUi!==true){
                $rootScope.ajaxProgress--;
              }
              //$rootScope.ajaxProgress--;
              return response || $q.when(response);
            },
              'responseError': function(rejection,config) {
                try{
                  if(!(rejection.config.customObj) || rejection.config.customObj.hideBlockingUi!==true){
                      $rootScope.ajaxProgress--;
                    }
                  var error=angular.fromJson(rejection.data);
                  if(error){
                    rejection.errorReason=error.error;
                  }
                }catch(err){

                }

                  return $q.reject(rejection);
             }
        };
    }]);
app.directive('datetimez', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs) {
          element.datetimepicker();
        }
    };
});
app.directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    app.service('fileUpload', ['$http', function($http) {
        this.uploadFileToUrl = function(file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function() {})
                .error(function() {});
        };
    }]);
