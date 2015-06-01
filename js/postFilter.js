
var app = angular.module("blog");


app.filter('postFilter', function() {
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
                    break;
                }

                if ($scope.isContentFilterOn) {
                    if (postList[i].text.indexOf(term) >= 0) {
                        out.push(postList[i]);
                        break;
                    }
                }

                if ($scope.isTagsFilterOn){
                        if (postList[i].tags.indexOf(term) >= 0) {
                            out.push(postList[i]);
                            break;
                        }
                    }               
            }
        }
    return out;
  }
});
