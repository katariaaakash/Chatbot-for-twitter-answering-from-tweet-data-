/**
 * Created by aakashkataria on 08/11/16.
 */
const tweet = require('twitter');
var creds = {
    consumer_key : 'secret',
    consumer_secret : 'secret',
    access_token_key: 'secret',
    access_token_secret: 'secret'
}
var fetchtweets = new tweet(creds);
var tweets_final = [];

module.exports = {
    gettrends: function (callback) {
        fetchtweets.get('trends/place', {id: 23424848}, function (err, tweets, response) {
            if(err)
                console.log("Error getting trends");
            else{
                // tweets = tweets[0].trends;
                // tweets.sort(function (x, y) {
                //     return x.tweet_volume < y.tweet_volume;
                // })
                callback(tweets);
            }

        })
    },
    fetchtweets_1: function (keyphrase_json, callback) {
        var keyphrase = keyphrase_json.information;
        var query_search = [];
        var hash_tag = keyphrase[0].toString();
        query_search.push(keyphrase[0].toString());
        for(var i = 1; i < keyphrase.length; i++){
            query_search.push('"' + keyphrase[i].toString() + '"');
        }
        var query_text = query_search.join(' OR ');
        // query_text = hash_tag + " " + query_text;
        query_text += " " + "-filter:retweets";
        console.log(query_text);
        var query = encodeURI(query_text);
        // var query = query_text;
        console.log(query);
        fetchtweets.get('search/tweets', {
            tweet_mode: 'extended',
            truncated: false,
            q: query,
            // filter:retweets,
            count: 1000,
            include_entities: true}, function(error, tweets, response) {
            tweets_final.push(tweets);
            id_val = tweets_final[tweets_final.length - 1];
            if(typeof id_val === 'undefined') {
                console.log("undefined");
                callback(tweets_final);
            }
            else {
                console.log("defined");
                if(typeof tweets.statuses === 'undefined' || typeof id_val.statuses[tweets.statuses.length - 1] === 'undefined'){
                    callback(tweets_final);
                }
                else {
                    fetchtweets.get('search/tweets', {
                        tweet_mode: 'extended',
                        truncated: false,
                        include_entities: true,
                        // filter:retweets,
                        q: query,
                        count: 1000,
                        max_id: id_val.statuses[tweets.statuses.length - 1].id
                    }, function (error, tweets, response) {
                        tweets_final.push(tweets);
                        id_val = tweets_final[tweets_final.length - 1];
                        if (typeof id_val === 'undefined') {
                            console.log("undefined");
                            callback(tweets_final);
                        }
                        else {
                            console.log("defined");
                            if (typeof tweets.statuses === 'undefined') {
                                callback(tweets_final);
                            }
                            else {
                                fetchtweets.get('search/tweets', {
                                    tweet_mode: 'extended',
                                    truncated: false,
                                    include_entities: true,
                                    // filter:'retweets',
                                    q: query,
                                    count: 1000,
                                    max_id: id_val.statuses[tweets.statuses.length - 1].id
                                }, function (error, tweets, response) {
                                    tweets_final.push(tweets);
                                    callback(tweets_final);
                                });
                            }
                        }
                    });
                }
            }
        });
    }
}