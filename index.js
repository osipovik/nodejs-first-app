var http = require("http");
var fs = require("fs");
var socketio = require("socket.io");
var html = require("escape-html");

var server = http.createServer();
var io = socketio(server);
var port = 3000;

fs.readFile("./index.html", function(err, html_string) {
	if (err) {
		throw err;
	}

	server.on('request', function(request, response) {
		response.writeHeader(200, {'Content-type': 'text/html'});
		response.end(html_string);
	});

	server.listen(port, function() {
		console.log("Server start on port " + port);
	});

	io.on('connection', function(socket) {
		socket.on('message', function(data) {
			if (data) {
				socket.broadcast.emit('message', data);
			};
		});
	});
});