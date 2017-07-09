/**
 * Created by aakashkataria on 14/11/16.
 */
const express = require('express');
const bp = require('body-parser');
const newser = require('./news_get');
const keywords = require('./keywordsgenerator');
const rakejs = require('./rakejs');
const fs = require('fs');
const tweets = require('./tweetfetcher');
const factors = require('./getfactors');
const sentence = require('./sentencemaker');
const sen = require('./sentencemaker_graph');
const dbhandler = require('./dbhandler');
const news_keywords = require('./neywords_rake_news');
const sum = require('./summerizer');

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(bp.urlencoded({
    extended: true
}))
app.use(bp.json());
app.use('/', express.static(__dirname + '/public_html'));

app.post('/', function (req, res) {
    tweets.gettrends(function (callback) {
        res.send(callback);
    })
})
app.post('/start_generation', function (req, res) {
    var text = req.body.comment.toString();
    var news = req.body.news;
    var name = req.body.name.toString();
    console.log(text);
    news_keywords.rake(news, function (callback) {
        fs.readFile('Keywords.txt', function (err, data) {
            if (err)
                console.log(err);
            else {
                var news_keywords = JSON.parse(data.toString());
                news_keywords = news_keywords.keywords;
                rakejs.rake(text, function (callback) {
                    fs.readFile('Keywords.txt', function (err, data) {
                        if(err)
                            console.log(err);
                        else{
                            var info = JSON.parse(data.toString());
                            info = info.keywords;
                            var len = info.length;
                            if(len >= 2) len = 2;
                            else len = len;
                            var keyphrases = [];
                            keyphrases.push(news_keywords[0].keys);
                            for(var i = 0; i < len; i++)
                                keyphrases.push(info[i].keys);
                            var data_json = {
                                information: keyphrases
                            }
                            tweets.fetchtweets_1(data_json, function (callback) {
                                var json_tweets = {
                                    tweets: callback,
                                    size: 1
                                }
                                factors.getfactors(json_tweets, data_json, function (call) {
                                    sen.sentences(call, data_json, info[0], function (callback) {
                                        console.log(callback);
                                        res.send(callback);
                                    })
                                    // sum.summerize(call, keyphrases, function (callback) {
                                    //     res.send(callback);
                                    // })
                                })
                            })
                        }
                    })
                })
            }
        });
    });
})

app.listen(app.get('port'), function () {
    console.log('Server running at  ' + app.get('port'));
})