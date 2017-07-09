/**
 * Created by aakashkataria on 21/11/16.
 */
const Graph = require('graphs-all');

class my_node {
    constructor(currunt, next) {
        this.currunt = currunt;
        this.next = next;
    }
}

function suffle(arr, len) {
    for(var i = len - 1; i > 0; i--) {
        var t = arr[i];
        var j = Math.floor(Math.random()*(i + 1));
        arr[i] = arr[j];
        arr[j] = t;
    }
    return arr;
}
function match_keywords(str, data_json) {
    var mod = 0;
    var keywords = data_json.information;
    for(var i = 0; i < keywords.length; i++){
        if(str.toUpperCase().includes(keywords[i].toString().toUpperCase()))
            mod++;
    }
    return mod;
}
function match_keywords_imp(a, top_keywords) {
    var imp = top_keywords.toString();
    if(a.toUpperCase().includes(imp.toUpperCase())){
        return 1;
    }
    else return 0;
}
var val = [];
function customised_dfs(graph, index, visited, temp, final, node) {
    if(index >= graph.nodes().length){
        return;
    }
    else {
        visited[index] = true;
        val = graph.nodes()[index].toString().split("&&&&");
        temp += val[0].toString() + " ";
        for(var i = 0; i < graph.nodes().length; i++){
            if(graph.hasLink(node, graph.nodes()[i].toString()) && visited[i] === false) {
                customised_dfs(graph, i, visited, temp, final, graph.nodes()[i].toString());
            }
        }
        final.push(temp);
    }
}

module.exports = {
    sentences: function (tweets, data_json, top_keyword, callback) {
        var graph = Graph.DirectedUnweightedGraph();
        var tweet_array = [];
        var temp;
        var temp_makegraph_0 = [];
        var temp_makegraph_1 = [];
        for(var i = 0; i < tweets.length; i++) {
            var temp_arr = tweets[i].text.split(" ");
            for(var j = 0; j < temp_arr.length - 1; j++){
                temp = new my_node(temp_arr[j].toString(), temp_arr[j + 1].toString());
                tweet_array.push(temp);
            }
            temp = new my_node(temp_arr[temp_arr.length - 1].toString(), '.');
            tweet_array.push(temp);
        }
        tweet_array = suffle(tweet_array, tweet_array.length);
        console.log(tweet_array.length);
        for(var i = 0; i < tweet_array.length; i++){
            graph.addNode(tweet_array[i].currunt.toString() + "&&&&" + tweet_array[i].next.toString());
        }
        for(var i = 0; i < graph.nodes().length; i++){
            for(var j = 0; j < graph.nodes().length; j++){
                temp_makegraph_0 = graph.nodes()[i].toString().split("&&&&");
                temp_makegraph_1 = graph.nodes()[j].toString().split("&&&&");
                if(i == j)
                    continue;
                else if(temp_makegraph_0[1].toString() == temp_makegraph_1[0].toString()){
                    graph.addLink(temp_makegraph_0[0].toString() + "&&&&" + temp_makegraph_0[1].toString(), temp_makegraph_1[0].toString() + "&&&&" + temp_makegraph_1[1].toString());
                }
            }
        }
        var full_final = [];
        for(var i = 0; i < graph.nodes().length; i++){
            var final_set = [];
            var visited = [];
            for(var k = 0; k < graph.nodes().length; k++){
                visited.push(false);
            }
            var node = graph.nodes()[i].toString();
            var temp = '';
            customised_dfs(graph, i, visited, temp, final_set, node);
            for(var t = 0; t < final_set.length; t++){
                full_final.push(final_set[t].toString());
            }
        }
        var full_sentence = full_final.sort(function (a, b) {
            return b.length - a.length;
        });
        for(var i = 0; i < data_json.information.length; i++){
            console.log(data_json.information[i])
        }
        var final_keyword_sentence = full_sentence.sort(function (a, b) {
            return match_keywords(b, data_json) - match_keywords(a, data_json);
        });
        for(var i = 0; i < full_sentence.length; i++){
            console.log(full_sentence[i] + ' ' + match_keywords(full_sentence[i], data_json));
        }
        var final_val = [];
        for(var i = 0; i < 10; i++){
            final_val[i] = final_keyword_sentence[i];
        }
        var sorted_final = final_val.sort(function (a, b) {
            return b.length - a.length;
        })
        console.log(sorted_final[0]);
        callback({
            name: 'Info',
            comment: sorted_final[0]
        });
    }
}