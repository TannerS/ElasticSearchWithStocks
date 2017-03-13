/*
 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
 https://github.com/cpp-cs499-cc/lessons/blob/master/l08-elastic-search-demo/handler.js
 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html
 http://techknights.org/workshops/nodejs-twitterbot/
 https://www.npmjs.com/package/twitter
 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html
 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
 */

var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

var elastic = new elasticsearch.Client({
    host: 'https://search-tanners-a4-3zh6dubjbvtso54rei6mf4kffm.us-east-1.es.amazonaws.com/',
    log: 'info'
});

// index: 'tweets',
//     type: 'science',

function search(term, callback) {

    console.log("VALUE: " + term);

    elastic.search({
        index: 'tweets',
        type: 'science',
        // body: {
        //     query: {
        //         match: {
        //             bdy: term
        //         }
        //     }
        // }
        body: {
            query: {
                        match: {
                            // match the query against all of
                            // the fields in the posts index
                            _all: term
                        }
            }
        }

                        // body: {
        //     "query": {
        //         "bool": {
        //             "must": {
        //                 "match": {
        //                     "keywords": term
        //                 }
        //             }
        //         }
        //     }
        // }
    }, function (error, response) {

        console.log("DEBUG 1: " + JSON.stringify(response));

        if (callback)
        {
            callback(response);
        }
    });
}

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.get('/', function(req, res, next)
{
    res.render('index', { title: 'Welcome' });
});

router.post('/', function (req, res)
{

    console.log("VALUE:" + req.body.q);

    search(req.body.q, function(result)
    {
        res.send(result);
    });
});


module.exports = router;
