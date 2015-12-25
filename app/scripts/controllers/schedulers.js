app.controller('SchedulerCtrl', ['$scope', '$rootScope','$http','$compile', '$timeout', 'uiCalendarConfig','schedulerServices','$mdDialog', '$mdMedia', function ($scope, $rootScope, $http, $compile, $timeout, uiCalendarConfig,schedulerServices,$mdDialog, $mdMedia) {
   
   setTimeout(function(){
    $('.fc-today-button').click();
  },1)
    // page is now ready, initialize the calendar...
    var request = $http.get('http://52.90.114.255:3000/schedular/list').then(function (response) {
        $scope.data = response; 
        return response; // this will be `data` in the next chained .then() functions
    });


$scope.getList = function () {
  request.then(function (response){
  $rootScope.events = [];
        var data = response.data;
        for(var i=25; i<data.length;i++) {
          var obj = {};
          if(data[i].start_time !== undefined || data[i].end_time !== undefined){
          obj.start = data[i].start_time;
            obj.end = data[i].end_time;
            $rootScope.events.push(obj);
            }
        }
      })
}
$scope.getList();

function DialogController($scope, $mdDialog) {
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

$scope.addEvent = function(ev) {
  var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/add.schedule.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  var start = moment().add(30, 'minutes')._d;
  var end = moment().add(90, 'minutes')._d;
  console.log(start);
  console.log(end);
  $scope.saveObj = {
        "user_id": "45345345hjk345hkj3h4j5h3k45345",
        "playlist_id": "1",
        "assets_count": "30",
        "video_duration": "2:30:00",
        "start_time": start,
        "end_time": end,
        "week_days": [0, 1, 2, 3, 4, 5, 6],
        "all_days": "yes"
      }
      schedulerServices.saveSchedule($scope.saveObj).then(function () {
        confirm('success');
        //window.location.reload(true);
        location.reload(); 
      }, function () {
                alert('failure');
              });
      
/*$http.post('http://52.90.114.255:3000/schedular/save',$scope.addEvent).success(function(data, status) {
            alert('saved successfully');
        }, function (){
          alert('Failure');
        })*/
}

$('#calendar').fullCalendar({
        // put your options and callbacks here
        defaultView:'agendaDay', 
        defaultDate: new Date(), 
         slotDuration: '00:01:00',
         header:{
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        timezone: 'local',
        selectable: true, 
        selectConstraint:{
          start: '00:01', // a start time (10am in this example)
          end: '23:59', // an end time (6pm in this example)
        }, 
        eventConstraint:{
          start: '00:00', // a start time (10am in this example)
          end: '24:00', // an end time (6pm in this example)
        }, 
        editable:true, 
        events: $rootScope.events
    })

$scope.title = 'My App Title';
    var imagePath = 'img/list/60.jpeg';
  $scope.todos = [];
  for (var i = 0; i < 15; i++) {
    $scope.todos.push({
      face: imagePath,
      what: "Brunch this weekend?",
      who: "Min Li Chan",
      notes: "I'll be in your neighborhood doing errands."
    });
  }

    

}]);


