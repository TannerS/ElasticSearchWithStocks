angular.module('ElasticSearch', [])
    .controller('SearchController', function($http, $scope) {
        $scope.search = function search() {

            var search_term = $('#search_input').val();

            $http.get("http://localhost:3000/search?q=" + search_term)

                .then(function(data)
                {
                    console.log(data);

                    if (data.data.hits)
                    {
                        for(var i = 0; i<data.data.hits.hits.length; i++ )
                        {
                            data.data.hits.hits[i]._source.body = null;
                        }
                        //$scope.suggestions = data.data.suggest.didYouMean;
                    } else {
                        //$scope.suggestions = data.data.suggest.didYouMean;
                    }
                }, function(err){

                });

        }
    });
