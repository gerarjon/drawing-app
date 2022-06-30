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
		socket.join(data);
		console.log(`User(${socket.id}) has joined room:${data}`);
	})

	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data);
	})

	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id)
	})
})

http.listen(PORT, function() {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
})