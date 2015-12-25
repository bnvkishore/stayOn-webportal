app.factory('schedulerServices', ['$http','$rootScope', function ($http,$rootScope) {
  'use strict';
  $http.defaults.headers.common.Authorization = '';
  var saveUrl,listUrl,data = {},baseUrl = 'http://52.90.114.255:3000';
  saveUrl = baseUrl+'/schedular/save';
  listUrl = baseUrl+'/schedular/list';
  data = {};

  /*service to get building Location details*/
  data.saveSchedule = function (data) {
    console.log(data);
    return $http.post(saveUrl,data,{
              headers : {
                'Content-Type' : undefined
              }
            });
  };

  return data;

}]);
