var app = module.exports = require('appjs'),
  fs = require('fs');

app.serveFilesFrom('./view');  // serves files to browser requests to "http://appjs/*"

var window = app.createWindow('http://appjs/', {
  width           : 1100,
  height          : 600,
  left            : -1,    // optional, -1 centers
  top             : -1,    // optional, -1 centers
  autoResize      : false, // resizes in response to html content
  resizable       : true, // controls whether window is resizable by user
  showChrome      : true,  // show border and title bar
  opacity         : 1,     // opacity from 0 to 1 (Linux)
  alpha           : true,  // alpha composited background (Windows & Mac)
  fullscreen      : false, // covers whole screen and has no border
  disableSecurity : false   // allow cross origin requests
});

window.on('create', function(){
  console.log("Window Created");
});

window.on('ready', function(){
  this.require = require;
  this.process = process;
  this.module = module;
  this.console.open();
  this.console.log('process', process);
  this.frame.center();
  this.frame.show();
  console.log("Window Ready");
});

window.on('close', function(){
  console.log("Window Closed");
});

var TEXT_DIR = __dirname + "/view/texts/";

app.get('/getText', function(req, res, next){
  var template = fs.readFileSync(TEXT_DIR + req.params.fn + ".html", 'utf-8');
  // console.log(template);
  res.send(template);
});
