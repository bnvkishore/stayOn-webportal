'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainApp
 */
angular.module('mainApp')
  .controller('WidgetsCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    vm.displayData = [
    {
        title: 'Widget Card one',
        Description: 'sample descripton'
    },
    {
        title: 'Widget Card two',
        Description: 'sample descripton'
    },
    {
        title: 'Widget Card three',
        Description: 'sample descripton'
    },
    {
        title: 'Widget Card four',
        Description: 'sample descripton'
    },
    {
        title: 'Widget Card five',
        Description: 'sample descripton'
    },
    {
        title: 'Widget Card six',
        Description: 'sample descripton'
    }
    ]

    vm.state="sort by";
     vm.states=[{
         abbrev:"ascending"
     },{
         abbrev:"descending"
     }]
     
  });
