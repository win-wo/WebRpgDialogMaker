var path = require('path');
var express = require('express');

var port = process.env.PORT || 1337;

var app = express();
app.use("/public", express.static(__dirname + '/public'));
var http = require('http').createServer(app);
http.listen(port);

app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/api/text/{chapterName}', function (req, res) {

});

app.post('/api/text/:chapterName', function (req, res) {
    var fs = require('fs');
    fs.writeFile("/databases/" + req.params.chapterName + ".json", req.body, function (err) {
        if (err) {
        }
    });
});

console.log("Server running");