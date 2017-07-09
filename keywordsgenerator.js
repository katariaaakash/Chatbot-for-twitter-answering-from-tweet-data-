/**
 * Created by aakashkataria on 14/11/16.
 */
var retext = require('retext');
var nlcstToString = require('nlcst-to-string');
var keywords = require('retext-keywords');

module.exports = {
    keywords: function (text, callback) {
        retext().use(keywords, {maximum: 3}).process(
            text.toString(), function (err, file) {
                console.log('Keywords:');

                file.data.keywords.forEach(function (keyword) {
                    console.log(nlcstToString(keyword.matches[0].node));
                });

                console.log();
                console.log('Key-phrases:');

                file.data.keyphrases.forEach(function (phrase) {
                    console.log(phrase.matches[0].nodes.map(nlcstToString).join(''));
                });
            }
        );
    }

}