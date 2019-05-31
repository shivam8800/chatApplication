var express = require('express');
var socket = require('socket.io');
var cors = require('cors');

// app setup
var app = express();
app.use(cors());
var server = app.listen(4000, function() {
	console.log('listing to port 4000');
});

// static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', function(socket) {
	console.log('made sockets connections', socket.id);
	//recieving data from a client
	socket.on('chat', function(data) {
		//sending data to all clients which are connected to a socket
		//grabing all socket(browsers) from io.sockets
		io.sockets.emit('chat', data);
	});

	// Handle typing event
	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', data);
	});
});
