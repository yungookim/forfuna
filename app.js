var app = module.exports = require('appjs'),
    fs = require('fs'),
    BE = require('./backend.js'),
    SYNC = require('./sync.js');

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
  // fs.writeFileSync(, "Hey there!", function(err) {
  //   if(err) {
  //       console.log(err);
  //   } else {
  //       console.log("The file was saved!");
  //   }
  // }); 
  var public_key = fs.readFileSync('public_key', 'utf-8');
  console.log(process.getuid());
  console.log(public_key);

  if (public_key.length != 64){
    //Not a vaild key, regenerate.
    //Note : Every message is synced to other users using the public key.
    //In case the public key is changed, the friends network should be 
    //notified of this and update there public key.
    
  }


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

app.get('/getText', function(req, res){
  var template = fs.readFileSync(TEXT_DIR + req.params.fn + ".html", 'utf-8');
  // console.log(template);
  res.send(template);
});

app.post('/get_profile', function(req, res){
  BE.get_profile(function(err, ret){
    if (err){
      console.log(err);
      res.send('err');
      return;
    }
    SYNC.push_profile(ret);
    res.send(ret);
  });
});

app.post('/save_profile', function(req, res){
  BE.save_profile(req.data, function(err, ret){
    if (err){
      console.log(err);
      res.send('err');
      return;
    }
    res.send('ok');
  });
});

app.post('/save_post', function(req, res){
  BE.save_post(req.data, function(err, ret){
    if(err){
      console.log(err);
      res.send('err');
    }
    res.send('ok');
  });
});

app.post('/save_comments', function(req, res){
  BE.save_comments(req.data, function(err, ret){
    if(err){
      console.log(err);
      res.send('err');
    }
    res.send('ok');
  });
});

app.post('/get_posts', function(req, res){
  BE.get_posts(function(err, ret){
    if(err){
      console.log(err);
      res.send('err');
    }
    res.send(ret);
  });
});

app.post('/set_news', function(req, res){
  BE.save_news(req.data, function(err, ret){
    if(err){
      console.log(err);
      res.send('err');
    }
    res.send(ret);
  });
});
