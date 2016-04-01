var reportFoodControllers = angular.module('reportFoodControllers', []);

reportFoodControllers.controller('FoodListCtrl', ['$scope', 'FoodList', function($scope, FoodList) {
  //Define query method
  $res = FoodList.query( function() {
    $scope.foods = $res.list.item; //Assign the foods list
    $scope.all = (localStorage.getItem('favs')!=null) ? JSON.parse(localStorage.getItem('favs')) : []; //Init the favorite list
    localStorage.setItem('favs', JSON.stringify($scope.all));//save the initial favorite list
  });
  
  //Delete Favorite method
  $scope.delFav = function (id) {
    for(i = 0; i<$scope.all.length; i++)
    {
      if($scope.all[i].foodId === id)	//Is this the obj we are looking for?
        $scope.all.splice(i, 1);	//remove it!
    }
    localStorage.setItem('favs', JSON.stringify($scope.all));	//Save the modified list
  }
}]);

reportFoodControllers.controller('FoodDetailCtrl', ['$scope', '$routeParams', 'FoodReport','$window', function($scope, $routeParams, FoodReport,$window) {
  //Define get method with default values			
  $scope.food = FoodReport.get({ndbno: $routeParams.foodId,type:'b',format:'json'}, function(food) {
  });
  
  //Load the favorite list
  $scope.all = (localStorage.getItem('favs')!=null) ? JSON.parse(localStorage.getItem('favs')) : [];
  localStorage.setItem('favs', JSON.stringify($scope.all));
  
  //Define add to favorites method
  $scope.addToFav = function() {
    //Define a new object to hold the food data
    var obj = {};
    obj.foodId = $scope.food.report.food.ndbno;
    obj.name = $scope.food.report.food.name;
     
    //is already on list?
    var isAlready = false;
    $scope.all.forEach( function(f) {
      if(f.foodId === obj.foodId)
      {
        isAlready = true;
      }
    });
     
    if(!isAlready) //Is not in the list?
    {
      $scope.all.push(obj);	//Add it to current list
      localStorage.setItem('favs', JSON.stringify($scope.all));		//Save the current list
    }
    $window.location.href = '/';	//Send to home page
  }
}]);
