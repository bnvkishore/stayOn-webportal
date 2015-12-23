'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mainApp
 */
angular.module('mainApp')
  .controller('MediaCtrl', function () {
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
  });
