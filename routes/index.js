var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var fs = require('fs');
var request = require("request");

var url = "http://quote.cnbc.com/quote-html-webservice/quote.htm?partnerId=2&requestMethod=quick&exthrs=1&noform=1&fund=1&output=json&symbols=.IBEX|.FTMIB|.OMXS30|.STOXX|.AXJO|.SSEC|.KS11|.STI|.SETI|.FTFCNBCA|.VIX|.VXN|.VXD&callback=quoteHandler2";


var search = new elasticsearch.Client({
    host: 'search-tanners-nv2iphulfkualyxfwwhsijkqr4.us-east-1.es.amazonaws.com/',
    log: 'info'
});

search.ping({
    requestTimeout: 3000
}, function (error) {
    if (error) {
        console.log('elasticsearch cluser is not operational');
    } else {
        console.log('elasticsearch cluser is operational');
    }
});

function searchForItem(term, callback) {
    client.search({
        index: '499-books',
        body: {
            "query": {
                "bool": {
                    "must": {
                        "match": {
                            "keywords": term
                        }
                    },
                    "filter": {
                        "range": { "year": { "gte": 2011, "lte": 2013 }}
                    }
                }
            }
        }
    }, function (error, response) {

        console.log(response);

        if (callback) {
            callback(response);
        }
    });
}

// var url = "http://quote.cnbc.com/quote-html-webservice/quote.htm?partnerId=2&requestMethod=quick&exthrs=1&noform=1&fund=1&output=json&symbols=.IBEX|.FTMIB|.OMXS30|.STOXX|.AXJO|.SSEC|.KS11|.STI|.SETI|.FTFCNBCA|.VIX|.VXN|.VXD&callback=quoteHandler2";

function loadDataSet()
{
    request({
        url: url,
        json: true
    }, function (error, response, body){
        if (!error && response.statusCode === 200)
        {
            console.log(body);
        }
    });



    //
    // fs.readFile("dataset/data.json", {encoding: 'utf-8'}, function(err,data) {
    //     if (!err) {
    //         var items = JSON.parse(data);
    //         for(var i = 0; i < 1000; i++) {
    //             console.log(items[i].id);
    //             client.create({
    //                 index: '499-books',
    //                 type: 'book',
    //                 id: items[i].id,
    //                 body: items[i]
    //             }, function (error, response) {
    //                 console.log("put item successfully.")
    //             })
    //         }
    //     } else{
    //         console.log(err);
    //     }
    // });
}




router.get('/', function(req, res, next)
{
    loadDataSet();
  res.render('index', { title: 'Welcome' });
});

module.exports = router;
