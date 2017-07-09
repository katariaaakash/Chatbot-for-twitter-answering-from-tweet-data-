/**
 * Created by aakashkataria on 03/12/16.
 */
const mysql = require('mysql');

function createconnection() {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'chatbot_database_user',
        //password : 'secret',
        database : 'chatbot_database'
    });
    return connection;
}

module.exports = {
    addnews: function (id, news_title) {
        var conn = createconnection();
        conn.connect();
        conn.query('insert into news_table values(' +
            id + ', "' + news_title.toString() + '");', function (err, rows, fields) {
            if (err) {
                console.log("Error Found");
            }
        });
        conn.end();
        delete conn;
    },
    setkeycomment: function (id) {
        var conn = createconnection();
        conn.connect();
        conn.query('insert into comment_id values(' + id + ');', function (err, rows, fields) {
            if(err) {
                console.log('error found in setkeycomment');
                throw err;
            }
        });
        conn.end();
        delete conn;
    },
    setkeynews: function (id) {
        var conn = createconnection();
        conn.connect();
        conn.query('insert into id_database values(' + id + ');', function (err, rows, fields) {
            if(err)
                console.log('error found');
        });
        conn.end();
        delete conn;
    },
    getkeynews: function (callback) {
        var conn = createconnection();
        conn.connect();
        conn.query('select MAX(id) as maximum from id_database;', function (err, rows, fields) {
            if(err)
                console.log('error found');
            else{
                callback(rows[0]);
            }
        });
        conn.end();
        delete conn;
    },
    viewnews: function (callback) {
        var conn = createconnection();
        conn.connect();
        conn.query('select * from news_table;', function (err, rows, fields) {
            if (err) {
                console.log("Error Found");
            }
            else{
                callback(rows);
            }
        });
        conn.end();
        delete conn;
    },
    viewnewscomments: function (news, callback) {
        console.log('in news comment');
        var conn = createconnection();
        conn.connect();
        conn.query('select * from news_comment where news = "' + news.toString() + '";', function (err, rows, fields) {
            if(err)
                console.log('error found');
            else {
                console.log('comments fetched');
                callback(rows);
            }
        });
        conn.end();
        delete conn;
    },
    getkeycomment: function (callback) {
        var conn = createconnection();
        conn.connect();
        conn.query('select MAX(id) as maximum from comment_id;', function (err, rows, fields) {
            if(err) {
                console.log('error found in getkeycomment');
                throw err;
            }
            else{
                callback(rows[0]);
            }
        });
        conn.end();
        delete conn;
    },
    addcomments: function (id, comment, news, commentedby) {
        var conn = createconnection();
        conn.connect();
        conn.query('insert into news_comment values(' +
            id + ',"' + comment.toString() + '", "' + news.toString() + '", "' + commentedby.toString() + '");', function (err, rows, fields) {
            if (err) {
                console.log("Error Found in addcomment");
                throw err;
            }
        });
        conn.end();
        delete conn;
    }
}
