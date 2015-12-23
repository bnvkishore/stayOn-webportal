'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainApp
 */
angular.module('mainApp')
  .controller('DisplayCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    vm.displayData = [
    {
    	title: 'Display Card one',
    	Description: 'sample descripton'
    },
    {
    	title: 'Display Card two',
    	Description: 'sample descripton'
    },
    {
    	title: 'Display Card three',
    	Description: 'sample descripton'
    },
    {
    	title: 'Display Card four',
    	Description: 'sample descripton'
    },
    {
    	title: 'Display Card five',
    	Description: 'sample descripton'
    },
    {
    	title: 'Display Card six',
    	Description: 'sample descripton'
    }
    ]
  });
