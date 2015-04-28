angular.module('first', []).
controller('postController', ['$scope', function($scope) {
    	$scope.postList=[];

     $scope.addPost=function(){
     	console.log("YOLO");
     	 var post={title:$scope.title,
			text:$scope.text
		};

		$scope.postList.push(post);
		  }


    }]);
