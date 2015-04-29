var app = angular.module("first", []);

app.controller("postController", function($scope, $http) {
  $http.get('http://private-79b25-blogtt.apiary-mock.com/posts').
  success(function(data, status, headers, config) {
    $scope.postList = data;
  }).
  error(function(data, status, headers, config) {
    console.log("error getting");
  })

  
	$scope.addPost = function(){
	    console.log($scope.title);
	    console.log($scope.text);
	    console.log(new Date());
    
	    $http.post('http://private-79b25-blogtt.apiary-mock.com/posts', {title: $scope.title, text: $scope.text, published_at: new Date() }).
	    	success(function(data, status, headers, config) {
	      
	    }).
	    error(function(data, status, headers, config) {
	     	console.log("error posting");
	    });
  	}
});

