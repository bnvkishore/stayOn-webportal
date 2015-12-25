'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainApp
 */
app.controller('MediaCtrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope, $http) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
var request = $http.get('http://52.90.114.255:3000/media/list/files').then(function (response) {
        $scope.data = response; 
        return response; // this will be `data` in the next chained .then() functions
    });

  request.then(function (response){
  vm.mediaData = response.data;
  console.log(vm.campaignData);
        /*var data = response.data;
        for(var i=25; i<data.length;i++) {
          var obj = {};
          obj.start = data[i].start_time;
            obj.end = data[i].end_time;
            $rootScope.events.push(obj);
        }*/
      })
    /*vm.displayData = [
    {
        title: 'Media Card one',
        Description: 'sample descripton'
    },
    {
        title: 'Media Card two',
        Description: 'sample descripton'
    },
    {
        title: 'Media Card three',
        Description: 'sample descripton'
    },
    {
        title: 'Media Card four',
        Description: 'sample descripton'
    },
    {
        title: 'Media Card five',
        Description: 'sample descripton'
    },
    {
        title: 'Media Card six',
        Description: 'sample descripton'
    }
    ]*/

    vm.state="sort by";
     vm.states=[{
         abbrev:"ascending"
     },{
         abbrev:"descending"
     }]
     
  }]);
