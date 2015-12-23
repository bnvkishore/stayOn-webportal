'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mainApp
 */
angular.module('mainApp')
  .controller('WidgetsCtrl', function () {
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
  });
