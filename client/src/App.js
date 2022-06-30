import React, { useState } from 'react';
import Chat from './Pages/Chat'
import './App.css';
import io from 'socket.io-client';
import JoinRoom from './Pages/JoinRoom';
import 'bulma/css/bulma.min.css';
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
				<JoinRoom 
					setUsername={setUsername}
					setRoom={setRoom}
					joinRoomHandler={joinRoomHandler}
				/>
			) : (
				<Chat 
					socket={socket} 
					username={username} 
					room={room} />
			)}
		</div>
	);
}

export default App;
