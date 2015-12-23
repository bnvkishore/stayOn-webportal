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
  app.controller('Menuctrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.element('.main-menu').click(function () {
    angular.element('.main-menu').removeClass('active');
    angular.element(this).addClass('active');
  });
    $scope.breadcrumb = 'displays'
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

  