//Transporation layer.
//Syncs encrypted messages in the server.

var http = require('http');

module.exports = {
	serverip : '',
	post_options : {  
	  host: "",
	  path : "",
	  port: 3000,
	  method: 'POST',
	  headers: {  
		    'Content-Type': 'application/x-www-form-urlencoded'
		}
	},

	push_profile : function(data){
		//setting server info below guarantees post_options 
		//initialized from the execution of the app
		this.serverip = data.server;
		data.public_key = "";
		this.post_options.host = this.serverip;


		this.post_options.path = "/prepare_profile";

		var req = http.request(this.post_options, function(res) {
		  console.log('STATUS: ' + res.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		    console.log('BODY: ' + chunk);
		  });
		});
		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});

		// write data to request body
		req.write(JSON.stringify(data));
		req.end();
	},

	get_friend : function(data, fn){
		this.post_options.path = "/get_friend";

		var req = http.request(this.post_options, function(res) {
		  console.log('STATUS: ' + res.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		    fn(null, chunk);
		  });
		});
		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});

		// write data to request body
		req.write(data.id);
		req.end();
	}
}
