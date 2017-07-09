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

function customised_dfs(graph, index, visited, temp, final, node) {
    if(index >= graph.nodes().length){
        return;
    }
    else {
        visited[index] = true;
        temp += graph.nodes()[index].toString();
        for(var i = 0; i < graph.nodes().length; i++){
            if(graph.hasLink(node, graph.nodes()[i].toString()) && visited[i] === false) {
                customised_dfs(graph, i, visited, temp, final, graph.nodes()[i].toString());
            }
        }
        final.push(temp);
    }
}

module.exports = {
    sentences: function (tweets, callback) {
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
        console.log(full_final.sort(function (a, b) {
            return b.length - a.length;
        }));
        callback(graph.nodes());
    }
}