import React, { useState } from 'react';
import Chat from './Pages/Chat'
import './App.css';
import io from 'socket.io-client';
const PORT = "http://localhost:3001"

const socket = io(PORT);

function App() {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(false);

	const joinRoomHandler = (event) => {
		event.preventDefault();
		if (username !== "" && room !== "") {
			socket.emit("join_room", room);
			setShowChat(true);
		}
	}

	return (
		<div className="App">
			{!showChat ? (
				<div className="joinChat-container">
					<form>
						<h3>Join A Chat</h3>
						<input
							type="text"
							placeholder="Username..."
							onChange={(event) => {
							setUsername(event.target.value);
							}}
						/>
						<input
							type="text"
							placeholder="Room ID..."
							onChange={(event) => {
							setRoom(event.target.value);
							}}
						/>
						<button onClick={joinRoomHandler}>Join A Room</button>
					</form>
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	);
}

export default App;
