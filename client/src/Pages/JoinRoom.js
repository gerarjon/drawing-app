import React from 'react';

const JoinRoom = ({setUsername, setRoom, joinRoomHandler}) => {
  return (
    <section className="joinChat__container">
		<div className="joinChat__content">
			<form className="joinChat__form-content">
				<h1 className="title">Join A Room</h1>
				<input
					className="input"
					type="text"
					placeholder="Username..."
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<input
					className="input"
					type="text"
					placeholder="Room ID..."
					onChange={(event) => {
						setRoom(event.target.value);
					}}
				/>
				<button className="button is-primary" onClick={joinRoomHandler}>Join A Room</button>
			</form>
		</div>

		<div className="joinChat__content">
			<div className="joinChat__about">
				<h3 className="subtitle">About</h3>
				<p>Input a username and a room ID. A new room ID can be used to create a new room or an existing room ID can be used to join a room.</p>
			</div>

		</div>

	</section>
  )
}

export default JoinRoom;