var express = require('express');
var qs = require('querystring');

var app = module.exports = express.createServer();

app.configure(function(){
 	app.use(express.static(__dirname + '/view'));	
 	app.use(express.bodyParser());
});

app.get('/', function(req, res, next){
	res.render('index');
});

app.listen(3000);