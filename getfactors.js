/**
 * Created by aakashkataria on 16/11/16.
 */
const fs = require('fs');

function booltoint(bool_var) {
    if(bool_var === false)
        return 0;
    else
        return 1;
}
function calculatemin(arr) {
    var min = Number(arr[0]);
    for(var i = 1; i < arr.length; i++){
        if(min > Number(arr[i]))
            min = Number(arr[i]);
    }
    return min;
}
function calculatemax(arr) {
    var max = Number(arr[0]);
    for(var i = 1; i < arr.length; i++){
        if(max < Number(arr[i]))
            max = Number(arr[i]);
    }
    return max;
}

var BOUNDS = 5;
module.exports = {
    getfactors: function (json_tweets, data_json, callback) {
        var len = json_tweets.tweets.length;
        console.log(len);
        var temp_tweets, temporary_tweet;
        var json_data = [];
        var final_time = [];
        var final_keywords = [];
        var final_url = [];
        var final_image = [];
        var final_followers = [];
        var eiginvectors = [0.3249, 0.2543, 0.1454, 0.1105, 0.0701, 0.0474, 0.0474];
        var final_retweets = [];
        var full_final = [];
        var final_favorites = [];
        var keywords = [];
        var min_max;
        var new_min_max;
        var new_full_final = [];
        var size = 1;
        
        for(var i = 0; i < len; i++) {
            temp_tweets = json_tweets.tweets[i];
            if(typeof temp_tweets !== 'undefined'){
                for (var j = 0; j < temp_tweets.statuses.length; j++) {
                    temporary_tweet = temp_tweets.statuses[j];
                    var created = temporary_tweet.created_at.toString();
                    var text = temporary_tweet.full_text.toString();
                    var retweet = temporary_tweet.retweet_count.toString();
                    var favorite = temporary_tweet.favorite_count.toString();
                    var followers = temporary_tweet.user.followers_count;
                    var url_array = temporary_tweet.entities.urls;
                    var image = temporary_tweet.hasOwnProperty('extended_entities');
                    var id = temporary_tweet.id_str.toString();
                    var data = {
                        time: created,
                        text: text,
                        retweet: retweet,
                        favorite: favorite,
                        followers: followers,
                        url_array: url_array,
                        image: image,
                        id: id
                    }
                    json_data.push(data);
                }
            }
        }
        var time = [];
        for(var i = 0; i < json_data.length; i++){
            var temp_time;
            var time_str = json_data[i].time;
            var new_time = time_str.split(" ");
            var hm = new_time[3].split(":");
            temp_time= {
                min: hm[1],
                mon: new_time[1],
                dat: new_time[2],
                hrs: hm[0],
                yr: new_time[5]
            }
            time.push(temp_time);
        }
        for(var i = 0; i < time.length; i++){
            var t1, t2, t3, t4, t5;
            t5 = time[i].min;
            t4 = time[i].hrs;
            t3 = time[i].dat;
            t2 = time[i].mon;
            t1 = time[i].yr;
            switch(t2){
                case "Jan":
                    t2 = "01";
                    break;
                case "Fab":
                    t2 = "02";
                    break;
                case "Mar":
                    t2 = "03";
                    break;
                case "Apr":
                    t2 = "04";
                    break;
                case "May":
                    t2 = "05";
                    break;
                case "Jun":
                    t2 = "06";
                    break;
                case "Jul":
                    t2 = "07";
                    break;
                case "Aug":
                    t2 = "08";
                    break;
                case "Sep":
                    t2 = "09";
                    break;
                case "Oct":
                    t2 = "10";
                    break;
                case "Nov":
                    t2 = "11";
                    break;
                case "Dec":
                    t2 = "12";
            }
            var num = t1 + t2 + t3 + t4 + t5;
            final_time.push(Number(num));
        }
        for(var i = 0; i < data_json.information.length; i++){
            keywords.push(data_json.information[i]);
        }
        console.log("keywords " + keywords);
        for(var i = 0; i < json_data.length; i++){
            var image = booltoint(json_data[i].image);
            var followers = Number(json_data[i].followers);
            var url = json_data[i].url_array.length;
            var favorites = Number(json_data[i].favorite);
            var retweets = Number(json_data[i].retweet);
            var rank = 0;
            for(var j = 0; j < data_json.information.length; j++){
                if(json_data[i].text.toString().toUpperCase().includes(keywords[j].toString().toUpperCase()) === true){
                    rank++;
                }
            }
            final_keywords.push(rank);
            final_url.push(url);
            final_image.push(image);
            final_favorites.push(favorites);
            final_followers.push(followers);
            final_retweets.push(retweets);
        }
        for(var i = 0; i < json_data.length; i++){
            var temp_info = {
                time: final_time[i],
                retweet: final_retweets[i],
                followers: final_followers[i],
                favorites: final_favorites[i],
                image: final_image[i],
                keywords: final_keywords[i],
                url: final_url[i],
                id: json_data[i].id,
                text: json_data[i].text
            }
            full_final.push(temp_info);
        }
        new_min_max = {
            time: {
                min: 0,
                max: calculatemax(final_time)
            },
            retweet: {
                min: 0,
                max: calculatemax(final_retweets)
            },
            followers: {
                min: 0,
                max: calculatemax(final_followers)
            },
            favorites: {
                min: 0,
                max: calculatemax(final_favorites)
            },
            url: {
                min: 0,
                max: calculatemax(final_url)
            },
            keywords: {
                min: 0,
                max: calculatemax(final_keywords)
            },
            image: {
                min: 0,
                max: calculatemax(final_image)
            }
        };
        
        min_max = {
            time: {
                min: calculatemin(final_time),
                max: calculatemax(final_time)
            },
            retweet: {
                min: calculatemin(final_retweets),
                max: calculatemax(final_retweets)
            },
            followers: {
                min: calculatemin(final_followers),
                max: calculatemax(final_followers)
            },
            favorites: {
                min: calculatemin(final_favorites),
                max: calculatemax(final_favorites)
            },
            url: {
                min: calculatemin(final_url),
                max: calculatemax(final_url)
            },
            keywords: {
                min: calculatemin(final_keywords),
                max: calculatemax(final_keywords)
            },
            image: {
                min: calculatemin(final_image),
                max: calculatemax(final_image)
            }
        }
        for(var i = 0; i < full_final.length; i++){
            var temp = {
                keywords: (((full_final[i].keywords - min_max.keywords.min)/
                (min_max.keywords.max - min_max.keywords.min))*(new_min_max.keywords.max
                - new_min_max.keywords.min)) + new_min_max.keywords.min,
                
                retweet: (((full_final[i].retweet - min_max.retweet.min)/
                (min_max.retweet.max - min_max.retweet.min))*(new_min_max.retweet.max
                - new_min_max.retweet.min)) + new_min_max.retweet.min,
                
                favorites: (((full_final[i].favorites - min_max.favorites.min)/
                (min_max.favorites.max - min_max.favorites.min))*(new_min_max.favorites.max
                - new_min_max.favorites.min)) + new_min_max.favorites.min,

                followers: (((full_final[i].followers - min_max.followers.min)/
                (min_max.followers.max - min_max.followers.min))*(new_min_max.followers.max
                - new_min_max.followers.min)) + new_min_max.followers.min,

                image: (((full_final[i].image - min_max.image.min)/
                (min_max.image.max - min_max.image.min))*(new_min_max.image.max
                - new_min_max.image.min)) + new_min_max.image.min,

                time: (((full_final[i].time - min_max.time.min)/
                (min_max.time.max - min_max.time.min))*(new_min_max.time.max
                - new_min_max.time.min)) + new_min_max.time.min,

                url: (((full_final[i].url - min_max.url.min)/
                (min_max.url.max - min_max.url.min))*(new_min_max.url.max
                - new_min_max.url.min)) + new_min_max.url.min,
                
                id: full_final[i].id,
                
                text: full_final[i].text
            }
            new_full_final.push(temp);
        }
        var fully_ranks = [];
        for(var i = 0; i < new_full_final.length; i++){
            var temp = {
                keywords: eiginvectors[0] * new_full_final[i].keywords,
                retweets: eiginvectors[1] * new_full_final[i].retweet,
                favorites: eiginvectors[2] * new_full_final[i].favorites,
                time: eiginvectors[3] * new_full_final[i].time,
                followers: eiginvectors[4] * new_full_final[i].followers,
                image: eiginvectors[5] * new_full_final[i].image,
                url: eiginvectors[6] * new_full_final[i].url,
                id: new_full_final[i].id,
                text: new_full_final[i].text
            }
            fully_ranks.push(temp);
        }
        var complete_final = [];
        for(var i = 0; i < fully_ranks.length; i++){
            var temp = {
                keywords: (fully_ranks[i].keywords/new_min_max.keywords.max)*100,
                retweets: (fully_ranks[i].retweets/new_min_max.retweet.max)*100,
                followers: (fully_ranks[i].followers/new_min_max.followers.max)*100,
                favorites: (fully_ranks[i].favorites/new_min_max.favorites.max)*100,
                time: (fully_ranks[i].time/new_min_max.time.max)*100,
                image: (fully_ranks[i].image/new_min_max.image.max)*100,
                url: (fully_ranks[i].url/new_min_max.url.max)*100,
                id: fully_ranks[i].id,
                text: fully_ranks[i].text
            }
            complete_final.push(temp);
        }
        var rank = [];
        for(var i = 0; i < complete_final.length; i++){
            temp = {
                rank: ((complete_final[i].keywords + complete_final[i].image + complete_final[i].retweets
                      + complete_final[i].time + complete_final[i].url + complete_final[i].followers
                      + complete_final[i].favorites)/700)*100,
                id: complete_final[i].id,
                text: complete_final[i].text
            }
            rank.push(temp);
        }
        var rank_sorted  = rank.sort(function compare(a, b) {
            return b.rank > a.rank ?  1 : b.rank < a.rank ? -1 : 0;
        });
        var top_ranks = [];
        rank_sorted = Array.from(new Set(rank_sorted));
        for(var i = 0; i < BOUNDS; i++){
            top_ranks.push(rank_sorted[i]);
        }
        var Make_new_tweets=[];

        var full_ranks = [];
        for(var i = 0; i < top_ranks.length; i++){
            var temp;
            Make_new_tweets = top_ranks[i].text.toString().split(" ");
            var tweet = "";
            for(var j = 0; j < Make_new_tweets.length; j++){
                if(Make_new_tweets[j].includes('https') !== true){
                    tweet = tweet + " " + Make_new_tweets[j];
                }
            }
            temp = {
                text: tweet.substring(1).replace(/[\r\n]+/g," ").replace('&amp; ', ''),
                id: top_ranks[i].id,
                rank: top_ranks[i].rank
            }
            full_ranks.push(temp)
        }
        console.log(full_ranks);
        callback(full_ranks);
    }
}