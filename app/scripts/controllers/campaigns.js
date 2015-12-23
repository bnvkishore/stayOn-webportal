'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mainApp
 */
angular.module('mainApp')
  .controller('CampaignsCtrl', function () {
    var vm = this;
    vm.displayData = [
    {
    	title: 'Playlist Card one',
    	Description: 'sample descripton'
    },
    {
    	title: 'Playlist Card two',
    	Description: 'sample descripton'
    },
    {
    	title: 'Playlist Card three',
    	Description: 'sample descripton'
    },
    {
    	title: 'Playlist Card four',
    	Description: 'sample descripton'
    },
    {
    	title: 'Playlist Card five',
    	Description: 'sample descripton'
    },
    {
    	title: 'Playlist Card six',
    	Description: 'sample descripton'
    }
    ]
  });
