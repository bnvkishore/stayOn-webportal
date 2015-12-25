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
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.element('.main-menu').click(function () {
    angular.element('.main-menu').removeClass('active');
    angular.element(this).addClass('active');
  });

  $scope.newEvent = function(ev){
      //code for popup arrival on new button
      console.log($scope.items);
      var useFullScreen = ($mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/newDisplay.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
           items: $scope.items
      }
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
     function DialogController($scope, $mdDialog) {
      $scope.items = [{
      imgNum:1
    },{
      imgNum:2
    },{
      imgNum:3
    },{
      imgNum:4
    },{
      imgNum:5
    }];
    $scope.states=[{
         abbrev:"landscape"
     },{
         abbrev:"portrait"
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
app.directive('datetimez', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs) {
          element.datetimepicker();
        }
    };
});