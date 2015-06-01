var app = angular.module("blog");

app.factory('blogService', function($http, $q) {
    var path = 'http://private-79b25-blogtt.apiary-mock.com';
    var blogServiceInstance = {};

    blogServiceInstance.getPosts = function() {
        return $http.get(path+'/posts')
            .success(function(data, status, headers, config) {
                console.log(data);
                return data;
            })
            .error(function(data, status, headers, config) {
                console.log("error getting " + status);
            });
    };

    return blogServiceInstance;
});