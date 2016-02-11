var port = process.env.PORT || 1337;

var express = require('express');
var app =express();
var http = require('http').createServer(app);
http.listen(port);

app.set('view engine', 'ejs');

app.get('/', function(req, res) {       
    res.render('pages/index');
});

console.log("Server running");