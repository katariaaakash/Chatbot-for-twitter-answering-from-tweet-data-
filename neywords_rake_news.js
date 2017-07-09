/**
 * Created by aakashkataria on 05/12/16.
 */
var PythonShell = require('python-shell');
var fs = require('fs')

var options = {
    scriptPath: './'
};

module.exports = {
    rake: function (text, callback) {
        fs.writeFile('./Keywords.txt', text.toString(), function (err) {
            if(err)
                console.log(err);
            else {
                PythonShell.run('reketut.py', options, function (err, results){
                    if(err)
                        console.log(err);
                    else
                        callback("true");
                });
            }
        })
    }
}