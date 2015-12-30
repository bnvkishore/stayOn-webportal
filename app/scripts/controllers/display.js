'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainApp
 */
angular.module('mainApp')
  .controller('DisplayCtrl', function ($timeout,$http,$scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    vm.grid=true;
    var request = $http.get('http://52.90.114.255:3000/display/list/displays').then(function (response) {
      $scope.data = response;
      return response; // this will be `data` in the next chained .then() functions
    });

    request.then(function (response){
      vm.displayData = response.data;
      console.log(vm.displayData);
    })
    /*vm.displayData = [
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
    ]*/
    vm.shuffleView=function(ev){
        vm.grid=true;
        angular.element('.icon-sel').removeClass('view-selected');
         angular.element('.grid-view').addClass('view-selected');
    };

    vm.mapView=function(ev){
        vm.grid=false;
        angular.element('.icon-sel').removeClass('view-selected');
        angular.element('.map-view').addClass('view-selected');
        $timeout(function(){
            var marker, map, path, myIcon;
                    marker = {
                        "name": 'test', //$window.localStorage.getItem('locationName'),
                        "lat": '17.3700',
                        "lng": '78.4800'
                    };
                    map = L.map('displayMap', {
                        attributionControl: false,
                        center: [marker.lat, marker.lng],
                        zoom: 8,
                        zoomControl: false
                    });
                    vm.localMap=map;
                    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
                        maxZoom: 22,
                        id: 'mapbox.streets'
                    }).addTo(map);
                    L.Icon.Default.imagePath = '/images';
                    path = L.Icon.Default.imagePath;
                    if (!path) {
                        throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
                    }
                    myIcon = L.icon({
                        iconUrl: 'images/iconCurrentLocationGreen.png',
                        iconSize: [25, 25],
                        iconAnchor: [15, 20]
                    });
                    L.marker([marker.lat, marker.lng], {
                            icon: myIcon
                        })
                        .bindPopup('<a href="#" target="_blank">' + marker.name + '</a>')
                        .addTo(map);
        },0);

    };
    vm.mapHeight=window.innerHeight-250;
    vm.state="sort by";
     vm.states=[{
         abbrev:"ascending"
     },{
         abbrev:"descending"
     }]

  });
