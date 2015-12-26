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
  .module('mainApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ui.calendar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/displays', {
        templateUrl: 'views/display.html',
        controller: 'DisplayCtrl',
        controllerAs: 'display'
      })
      .when('/media', {
        templateUrl: 'views/media.html',
        controller: 'MediaCtrl',
        controllerAs: 'media'
      })
      .when('/widgets', {
        templateUrl: 'views/widgets.html',
        controller: 'WidgetsCtrl',
        controllerAs: 'widgets'
      })
      .when('/campaigns', {
        templateUrl: 'views/campaigns.html',
        controller: 'CampaignsCtrl',
        controllerAs: 'campaigns'
      })
      .when('/scheduler', {
        templateUrl: 'views/schedulers.html',
        controller: 'SchedulerCtrl',
        controllerAs: 'scheduler'
      })
      .otherwise({
        redirectTo: '/displays'
      });
  });
  app.controller('Menuctrl', function ($scope, $location, $mdMedia, $mdDialog) {
    angular.element('.main-menu').click(function () {
    angular.element('.main-menu').removeClass('active');
    angular.element(this).addClass('active');
  });

  $scope.newEvent = function(ev) {
        //code for popup arrival on new button
        // console.log($scope.items);
        var useFullScreen = ($mdMedia('xs')) && $scope.customFullscreen;
        if ($scope.state == "display") {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/newEvent.html',
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

            function DialogController($scope, $mdDialog) {
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

    $scope.breadcrumb = $location.path();
    $scope.displayNavigation = function(path) {
      $scope.breadcrumb = path
        $location.path('/'+path);
    };
    $scope.mediaNavigation = function(path) {
      $scope.breadcrumb = path
        $location.path('/'+path)
    };
    $scope.widgetsNavigation = function(path) {
      $scope.breadcrumb = path
        $location.path('/'+path)
    };
    $scope.campaignsNavigation = function(path) {
      $scope.breadcrumb = path
        $location.path('/'+path)
    };
    $scope.schedulerNavigation = function(path) {
      $scope.breadcrumb = path
        $location.path('/'+path)
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
        }
    }]);