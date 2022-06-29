const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const http = require('http').createServer();
const io = require('socket.io')(http);

io.on("connection", (socket) => {
	socket.io("message", (message) => {
		socket.broadcast.emit("message", message);
	})
})
http.listen(PORT, function() {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
})