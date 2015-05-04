var app = angular.module("first", []);

app.controller("postController", function($scope, $http) {

    var temp;
    var path='http://private-79b25-blogtt.apiary-mock.com';

    $http.get(path+'/posts')
        .success(function(data, status, headers, config) {
            $scope.postList = data;
        })
        .error(function(data, status, headers, config) {
            console.log("error getting " + status);
        });

  
	$scope.addPost = function(){
        var post = {
            title: $scope.title,
            text: $scope.text,
            published_at: new Date()
          };

	    $http.post(path+'/posts', post)
        .success(function(data, status, headers, config) {
	            $scope.postList.push(post);
	             })
        .error(function(data, status, headers, config) {
	     	console.log("error posting " + status);
	       });

        $scope.title = "";
        $scope.text = "";
  	};

    $scope.deletePost = function(post){
        var del = confirm("Are you sure you want to delete or modify this post?");
        if(del){ 
            var i = $scope.postList.indexOf(post);
            $scope.postList.splice(i,1);
        }
       
    };

    $scope.editPost = function (post) {  

     
        $scope.deletePost(post);
        $scope.form_header = "Edit post";
        $scope.title = post.title;
        $scope.text = post.text;
        temp = post;
    };

    $scope.cancelEdit = function (){
        $http.post(path+'/posts', temp)
        .success(function(data, status, headers, config) {
                $scope.postList.push(temp);
        })
        .error(function(data, status, headers, config) {
            console.log("error posting "+ status);
        });

        $scope.title = "";
        $scope.text = "";
    };

});

