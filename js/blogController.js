var app = angular.module("blog", []);

app.controller("blogController", function($scope, $http) {

    var path = 'http://private-79b25-blogtt.apiary-mock.com';
    $scope.titleFilter = "";
    $scope.contentFilter = "";
    $scope.formMode="NEW";

    $('.datepicker').datepicker();

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
        if (validateForm(post.title,post.text)) {
          $http.post(path+'/posts', post)
            .success(function(data, status, headers, config) {
                $scope.postList.push(post);
            })
            .error(function(data, status, headers, config) {
     	          console.log("error posting " + status);
            });
        }
        //$scope.text = $scope.initial;
        $scope.title = $scope.initial;
        $scope.text = $scope.initial;
  	};

    var validateForm = function(title,text){
        var titleCheck = Boolean(title);
        var textCheck = Boolean(text);
        var result = titleCheck && textCheck;
        return result;
    };

    $scope.deletePost = function(post){
        var del = confirm("Are you sure you want to delete this post?");
        if(del){
          var i = $scope.postList.indexOf(post);
          var delPost={
              "delete_id": i
          };
          $http.delete(path+'/posts', delPost)
            .success(function(data, status, headers, config) {
                $scope.postList.splice(i,1);
            })
            .error(function(data, status, headers, config) {
                console.log("Error during post deleting: " + status);
            });
        }
    };

    var editedPostindex;
    var existingPosts;
    $scope.editPost = function (post) {
        $scope.formMode = "EDIT";
        editedPostindex = $scope.postList.indexOf(post);
        existingPosts = $scope.postList;
        $scope.postList = [post];
        $scope.text = post.text;
        $scope.title = post.title;
    };

    $scope.confirmEdit = function(){
        if (validateForm($scope.title, $scope.text)) {
          var editedPost = {
            "post_id": editedPostindex,
            "new_title": $scope.title,
            "new_text": $scope.text
          };
          $http.put(path+'/posts', editedPost)
            .success(function(data, status, headers, config) {
                existingPosts[editedPostindex].title=$scope.title;
                existingPosts[editedPostindex].text=$scope.text;
                $scope.postList = existingPosts;
                $scope.formMode = "NEW";
                $scope.title = $scope.initial;
                $scope.text = $scope.initial;
                existingPosts = null;
                editedPostindex = null;
            })
            .error(function(data, status, headers, config) {
                console.log("Error during post editing: " + status);
            });
        }
    };

    $scope.cancelEdit = function (){
        $scope.formMode = "NEW";
        $scope.postList = existingPosts;
        //$scope.text = $scope.initial;
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
