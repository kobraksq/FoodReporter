var reportFoodServices = angular.module('reportFoodServices', ['ngResource']);
var vAPI_KEY = 'zvhZx86yZ5LtJrKUGhQaLAVObOSGmXtF9nUiHOkD';	//The private KEY to use the API

//The FoodList Service to provide the list of foods available
reportFoodServices.factory('FoodList', ['$resource',
  function($resource){
    return $resource('http://api.nal.usda.gov/ndb/list?format=:format&lt=:lt&sort=:sort&api_key=:api_key', {}, {
      query: {method:'GET',params:{format:'json',lt:'f',sort:'n',api_key:vAPI_KEY}, isArray:false}
    });
  }]);

//The FoodReport Servide to provide the details on a food id
reportFoodServices.factory('FoodReport', ['$resource',
  function($resource){
    return $resource('http://api.nal.usda.gov/ndb/reports/',{type:'b',format:'json',api_key:vAPI_KEY}, {
      query: {method:'GET', params:{type:'b',format:'json',api_key:vAPI_KEY}, isArray:false}
    });
  }]);
