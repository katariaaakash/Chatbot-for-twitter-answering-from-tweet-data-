/**
 * Created by aakashkataria on 18/11/16.
 */
class my_node {
    constructor(currunt, next) {
        this.currunt = currunt;
        this.next = next;
    }
}

function recursive_tweet_maker(tweets, index, length, final_tweets, visited, temp, last_word) {
    if(index >= length) {
        return;
    }
    else{
        last_word = tweets[index].next.toString();
        temp += tweets[index].currunt.toString() + " ";
        visited[index] = true;
        for(var i = 0; i < length; i++){
            if(i === index)
                continue;
            else if (visited[i] === false && tweets[i].currunt.toString() === last_word) {
                // temp += tweets[i].currunt.toString() + " ";
                // visited[i] = true;
                recursive_tweet_maker(tweets, i, length, final_tweets, visited, temp, last_word);
                // visited[i] = false;
                final_tweets.push(temp);
            }
        }
        visited[index] = false;
    }
}
module.exports = {
    makesentence: function (tweets, callback) {
        var last_word = "";
        var final_tweets = [];
        var tweet_array = [];
        var visited = [];
        var temp;
        for(var i = 0; i < tweets.length; i++) {
            var temp_arr = tweets[i].text.split(" ");
            for(var j = 0; j < temp_arr.length - 1; j++){
                temp = new my_node(temp_arr[j].toString(), temp_arr[j + 1].toString());
                tweet_array.push(temp);
                visited.push(false);
            }
            temp = new my_node(temp_arr[temp_arr.length - 1].toString(), '.');
            tweet_array.push(temp);
            visited.push(false);
        }
        console.log(tweet_array.length + " " + visited.length);
        console.log(tweet_array);
        temp = "";
        recursive_tweet_maker(tweet_array, 0, tweet_array.length, final_tweets, visited, temp, last_word);
        console.log("AAKASH")
        var full_answers = final_tweets.sort(function (x, y) {
            return y.length - x.length;
        });
        console.log(full_answers);
        callback(full_answers);
    }
}