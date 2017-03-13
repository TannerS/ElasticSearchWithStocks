angular.module('ElasticSearch', [])
    .controller('SearchController', function($http, $scope) {
        $scope.search = function search() {

            // var search_term = $('#search_input').val();

            // $http.post("/search?q=" + search_term)
            $http.post('/', {q: $scope.term})
                .then(function(data)
                {
                    // console.log("DEBUG 2:" + data);
                    console.log("DEBUG 2:" + JSON.stringify(data));

                    if (data.data.hits)
                    {
                        for(var i = 0; i<data.data.hits.hits.length; i++ )
                        {
                            // console.log(JSON.stringify(data.data.hits.hits[i]));
                            // console.log(JSON.stringify(data.data.hits.hits[i]._source.body.username));
                            console.log(JSON.stringify(data.data.hits.hits[i]._source.username));
                            console.log(JSON.stringify(data.data.hits.hits[i]._source.tweet));

                            // data.data.hits.hits[i]._source.body = null;
                        }
                        //$scope.suggestions = data.data.suggest.didYouMean;
                    } else {
                        //$scope.suggestions = data.data.suggest.didYouMean;
                    }
                }, function(err){

                });

        }
    });
