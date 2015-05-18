var app = angular.module("blog", []);

app.controller("postController", function($scope, $http) {

    var path = 'http://private-79b25-blogtt.apiary-mock.com';
   

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
            published_at: new Date(),
            tags: $scope.tags
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
        $scope.tags = [];
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


});


app.filter('myfilter', function() {
    return function(postList, $scope) {
        var out = [];
        var term = $scope.filterTerm;
        var dateFrom;
        var dateTo;

        if($scope.dateFrom){
            dateFrom  = Date.parse($scope.dateFrom);
        }
        else{
            dateFrom = Number.NEGATIVE_INFINITY;
        }

        if($scope.dateTo){
            dateTo = Date.parse($scope.dateTo);
        }
        else{
            dateTo = Number.POSITIVE_INFINITY;
        }
        
       

        if (!postList) return out;
        if (!term) return postList;

        var i;
        for (i = 0; i < postList.length; i++) {            

            if(((Date.parse(postList[i].published_at) >= dateFrom) 
                && (Date.parse(postList[i].published_at) <= dateTo)))
            {

                if (postList[i].title.indexOf(term) >= 0) {
                    out.push(postList[i]);         
                }
 
                else if ($scope.isContentFilterOn) {
                    if (postList[i].text.indexOf(term) >= 0) {
                        out.push(postList[i]);        
                    }
                }    
            }
      
        
        }
    
    return out;
  }
});




