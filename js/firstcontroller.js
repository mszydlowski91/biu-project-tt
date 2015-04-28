var app = angular.module("first", []);

app.controller("postController", function($scope, $http) {
  $http.get('http://private-79b25-blogtt.apiary-mock.com/posts').
    success(function(data, status, headers, config) {
      $scope.postList = data;
    }).
    error(function(data, status, headers, config) {
      console.log("error getting");
    });


$http.post('http://private-79b25-blogtt.apiary-mock.com/posts', {title: $scope.title, text: $scope.text }).
  success(function(data, status, headers, config) {

  }).
 error(function(data, status, headers, config) {
     console.log("error posting");
  });
});

