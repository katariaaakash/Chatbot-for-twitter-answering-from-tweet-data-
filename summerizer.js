/**
 * Created by aakashkataria on 30/12/16.
 */
var tweet;
var tweet_array = [];

module.exports = {
    summerize: function (tweets, keywords, callback) {
        var final = [];
        for(var i = 0; i < 10; i++){
            final.push(tweets[i].text);
        }
        // console.log(final);
        // var indexes = [];
        // var keywords_indeces = [];
        // for(var i = 0; i < 10; i++){
        //     indexes.push(false);
        // }
        // final.sort(function (x, y) {
        //     return x.length > y.length;
        // });
        // var k = 0;
        // for(var i = 0; i < final.length; i++){
        //     var count = 0;
        //     for(var j = 0; j < keywords.length; j++){
        //         if(final[i].toString().toUpperCase().includes(keywords[j].toString().toUpperCase())){
        //             count++;
        //         }
        //     }
        //     if(count > keywords.length/2){
        //         indexes[i] = true;
        //     }
        // }
        // console.log(indexes);
        // var new_final = [];
        // for(var i = 0; i < final.length; i++){
        //     if(indexes[i] === true){
        //         new_final.push(final);
        //     }
        // }
        // if(new_final.length === 0){
        //     new_final.push('no reasonable solution formed');
        // }
        callback({name: 'chatbot', comment: final.join(' || ').toString()});
    }
}