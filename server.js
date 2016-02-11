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

console.log("Server running");