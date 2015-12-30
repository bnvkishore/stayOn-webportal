angular.module('main', ['ui.router', 'ngAnimate', 'ngTouch', 'ngResource', 'ngSanitize', 'ngCookies','ngMaterial','ui.calendar']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


  $urlRouterProvider.otherwise('/displays');

  $stateProvider
    // States
    .state("displays", {
      url:"/displays",
      controller:'DisplayCtrl as display',
      templateUrl: "views/display.html"
    })
    .state("media", {
      url:"/media",
      controller:'MediaCtrl as media',
      templateUrl: "views/media.html"
    })
    .state("widgets", {
      url:"/widgets",
      controller:'WidgetsCtrl as widgets',
      templateUrl: "views/widgets.html"
    })
    .state("campaigns", {
      url:"/campaigns",
      controller:'CampaignsCtrl as campaigns',
      templateUrl: "views/campaigns.html"
    })
    .state("scheduler", {
      url:"/scheduler",
      controller:'SchedulerCtrl as scheduler',
      templateUrl: "views/schedulers.html"
    })


}])
