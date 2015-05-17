var app = angular.module("blog", []);

app.controller("blogController", function($scope, $http) {

    var path = 'http://private-79b25-blogtt.apiary-mock.com';
    $scope.titleFilter = "";
    $scope.contentFilter = "";

    $('.datepicker').datepicker();

    $http.get(path+'/posts')
        .success(function(data, status, headers, config) {
            $scope.postList = data;
        })
        .error(function(data, status, headers, config) {
            console.log("error getting " + status);
        });
  $scope.form_header="New post";

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

    var backupPostContent;
    $scope.editPost = function (post) {       
        $scope.deletePost(post);
        $scope.form_header = "Edit post";
        $scope.title = post.title;
        $scope.text = post.text;
        backupPostContent = post;
    };

    $scope.cancelEdit = function (){
        $http.post(path+'/posts', backupPostContent)
        .success(function(data, status, headers, config) {
                $scope.postList.push(backupPostContent);
                $scope.form_header="New post";
        })
        .error(function(data, status, headers, config) {
            console.log("error posting "+ status);
        });
        $scope.title = "";
        $scope.text = "";
    };


    $scope.filter = function(term){
          
    }

    // $scope.filterPosts = function (post){
    //     var filterTerm = $scope.filterTerm;
    //     console.log(filterTerm);
    //    // if angular.isUndefined($scope.filterTerm) return true;
    //    // $scope.filterStatus = null;
    //     if (post.title.indexOf(filterTerm)!=-1)  {
    //         if ($scope.searchInContent) {
    //             if (post.text.indexOf(filterTerm)!=-1) {
    //                 return true;
    //             }
    //         } 
    //         else return true;
    //     }
    //     return false;
    //    // return val.title == filterTerm;*/
    //     /*var filteredList = [];
    //     var i;
    //     for (i = 0; i < $scope.postList.length; i++){
    //         if($scope.postList[i].title.indexOf(filterTerm) >= 0) {
    //             if ($scope.searchInContent) {
    //                 if (post.text.indexOf(filterTerm)!=-1) {
    //                     filteredList.push($scope.postList[i]);
    //                 }
    //             } else filteredList.push($scope.postList[i]);                
    //         }
    //     }
    //     $scope.postList = filteredList;
    // }

})
.directive('post', function(){
    return {
        templateUrl: 'includes/post.html'
    };
});

