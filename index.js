const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001;
const http = require('http').createServer(app);
app.use(cors());

const io = require('socket.io')(http, {
	cors: {
		origin: "*"
	}
});

io.on("connection", (socket) => {
	console.log("User Connected", socket.id)

	socket.on("join_room", data => {
		const user = {...data, id:socket.id, score: 0}
		socket.join(data.room);
		socket.to(data.room).emit("join_message", `${user.username} has connected`)
		console.log(`User(${socket.id}||${user.username}) has joined room:${data.room}`);
	})

	socket.on("send_message", (data) => {
		// socket.to(data.room).emit("receive_message", data);
		socket.to(data.room).emit("receive_message", data);
	})

	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id)
	})
})

http.listen(PORT, function() {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
})