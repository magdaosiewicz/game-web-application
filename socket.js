var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
 
var chat = {
	start: function(){
		server.listen(8000);
		io.set("origins", "*:*");
 
		io.on('connection', function (socket) {         // line 12
			socket.on('newMessage', function (data) {
				socket.emit('chatUpdate',data);
				socket.broadcast.emit('chatUpdate',data);
			});
			socket.on('newUser', function (data) {
				socket.emit('chatUpdate',
					{'userName':'','text':data+' has entered the room'});
				socket.broadcast.emit('chatUpdate',
					{'userName':'','text':data+' has entered the room'});
			});
		});	
	}
}
 
module.exports = chat;