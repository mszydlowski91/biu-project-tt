var app = angular.module("blog");

app.directive('post', function(){
    return {
        templateUrl: 'includes/post.html'
    };
});
