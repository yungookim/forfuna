//Transporation layer.
//Syncs encrypted messages in the server.

var http = require('http');

module.exports = {
	serverip : "23.23.188.2",
	post_options : {  
	  host: "23.23.188.2",
	  path : "",
	  port: 3000,
	  method: 'POST',
	  headers: {  
		    'Content-Type': 'application/json'
		}
	},

	push_profile : function(data){
		data.public_key = "";

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

		console.log(data);

		// write data to request body
		req.write(JSON.stringify(data));
		req.end();
		this.post_options.path = '';
	},

	get_friend : function(data, fn){
		this.post_options.path = "/get_friend_info";

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
		  fn(e.message);
		});

		// write data to request body
		req.write(data.id);
		req.end();
		this.post_options.path = '';
	},

	request_friend : function(data, fn){
		var headers = {
			'Content-Type': 'application/json',
			'Content-Length': JSON.stringify(data).length
		};

		var options = {
			host: "23.23.188.2",
			port: 3000,
			path: '/request_friend',
			method: 'POST',
			headers: headers
		};

		var req = http.request(options, function(res) {
		  console.log('STATUS: ' + res.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		    fn(null, chunk);
		  });
		});
		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		  fn(e.message);
		});

		// write data to request body
		req.write(JSON.stringify(data));
		req.end();
	}
}
