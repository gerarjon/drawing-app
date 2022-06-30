import React from 'react';

const JoinRoom = ({setUsername, setRoom, joinRoomHandler}) => {
  return (
    <div className="joinChat-container">
		<form>
			<h3>Join A Room</h3>
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
  )
}

export default JoinRoom;