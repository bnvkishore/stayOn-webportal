'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainApp
 */
angular.module('mainApp')
  .controller('MediaCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    vm.displayData = [
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
    ]

    vm.state="sort by";
     vm.states=[{
         abbrev:"ascending"
     },{
         abbrev:"descending"
     }]
     
  });
