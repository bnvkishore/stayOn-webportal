app.controller('SchedulerCtrlereed', function($scope, $http, schedulerServices) {
     var request = $http.get('http://52.90.114.255:3000/schedular/list').then(function (response) {
        $scope.data = response; 
        return response; // this will be `data` in the next chained .then() functions
    });

    request.then(function (data) { console.log(data); });

    $scope.someFunction = function () {
    	request.then(function (data){
    		console.log(data);
    	})
    }
    

 });


request.then(function (response){
        var data = response.data;
        for(var i=0; i<data.length;i++) {
          var obj = {};
          if(data[i].start_time !== undefined || data[i].end_time !== undefined){
            /*obj.start = data[i].start_time;
            obj.end = data[i].end_time;
            $scope.events.push(obj);*/
          }
        }
        var obj = {};
        obj.start = data[14].start_time;
            obj.end = data[14].end_time;
            $scope.events.push(obj);
        console.log($scope.events);
      })


app.controller('SchedulerCtrl', ['$scope', '$q','$http','$compile', '$timeout', 'uiCalendarConfig','schedulerServices','$mdDialog', '$mdMedia', function ($scope, $q, $http, $compile, $timeout, uiCalendarConfig,schedulerServices,$mdDialog, $mdMedia) {
   var request = $http.get('http://52.90.114.255:3000/schedular/list').then(function (response) {
        $scope.data = response; 
        return response; // this will be `data` in the next chained .then() functions
    });
$scope.list = [];
   request.then(function (response){
        var data = response.data;
        /*for(var i=0; i<data.length;i++) {
          var obj = {};
          if(data[i].start_time !== undefined || data[i].end_time !== undefined){
            obj.start = data[i].start_time;
            obj.end = data[i].end_time;
            $scope.events.push(obj);
          }
        }*/
       /* var obj = {};
        obj.start = data[4].start_time;
            obj.end = data[4].end_time;
            $scope.list.push(obj);
        console.dir($scope.list);*/
        $scope.events = [
    { id:1, text:"Task A-12458",
      start_date: $scope.list[0].start,
      end_date: $scope.list[0].end },
    { id:2, text:"Task A-83473",
      start_date: new Date(2015, 10, 22 ),
      end_date: new Date(2015, 10, 24 ) }
  ];
  console.log($scope.events);
      })

   

  $scope.scheduler = { date : new Date(2013,10,1) };
}]);


app.directive('dhxScheduler', function() {
  return {
    restrict: 'A',
    scope: false,
    transclude: true,
    template:'<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',

    

    link:function ($scope, $element, $attrs, $controller){
      //default state of the scheduler
      if (!$scope.scheduler)
        $scope.scheduler = {};
      $scope.scheduler.mode = $scope.scheduler.mode || "month";
      $scope.scheduler.date = $scope.scheduler.date || new Date();

      //watch data collection, reload on changes
      $scope.$watch($attrs.data, function(collection){
        scheduler.clearAll();
        scheduler.parse(collection, "json");
      }, true);

      //mode or date
      $scope.$watch(function(){
        return $scope.scheduler.mode + $scope.scheduler.date.toString();
      }, function(nv, ov) {
        var mode = scheduler.getState();
        if (nv.date != mode.date || nv.mode != mode.mode)
          scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
      }, true);

      //size of scheduler
      $scope.$watch(function() {
        return $element[0].offsetWidth + "." + $element[0].offsetHeight;
      }, function() {
        scheduler.setCurrentView();
      });

      //styling for dhtmlx scheduler
      $element.addClass("dhx_cal_container");

      //init scheduler
      scheduler.init($element[0], $scope.scheduler.mode, $scope.scheduler.date);
    }
  }
});

app.directive('dhxTemplate', ['$filter', function($filter){
  scheduler.aFilter = $filter;

  return {
    restrict: 'AE',
    terminal:true,
   
    link:function($scope, $element, $attrs, $controller){
      $element[0].style.display = 'none';

      var template = $element[0].innerHTML;
      template = template.replace(/[\r\n]/g,"").replace(/"/g, "\\\"").replace(/\{\{event\.([^\}]+)\}\}/g, function(match, prop){
        if (prop.indexOf("|") != -1){
          var parts = prop.split("|");
          return "\"+scheduler.aFilter('"+(parts[1]).trim()+"')(event."+(parts[0]).trim()+")+\"";
        }
        return '"+event.'+prop+'+"';
      });
      var templateFunc = Function('sd','ed','event', 'return "'+template+'"');
      scheduler.templates[$attrs.dhxTemplate] = templateFunc;
    }
  };
}]);