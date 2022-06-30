import React, { useEffect, useState } from 'react';

const Chat = ({socket, room, username}) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	const sendMessageHandler = async (event) => {
		event.preventDefault();
		if (currentMessage === "") return;
		const messageData = {
			room: room,
			author: username, 
			message: currentMessage,
			time: 
				new Date(Date.now()).getHours() +
				new Date(Date.now()).getMinutes(),
		};

		await socket.emit("send_message", messageData);
		setMessageList((prevList) => [...prevList, messageData]);
		setCurrentMessage("")
	}

	useEffect(() => {
		socket.on("receive_message", data => {
			setMessageList((prevList) => [...prevList, data])
		})
	}, [socket])

	return (
		<div>
			<div className='chatRoom-header'>
				<h3>Room: {room}</h3>
			</div>
			<div className='chatRoom-body'>
				{messageList.map((message, index) => {
					return(
						<div key={index}>
							<p>{message.author}: {message.message}</p>
						</div>
					)
				})}
			</div>
			<div className='chatRoom-footer'>
				<form>
					<input
						type="text"
						value={currentMessage}
						placeholder="Type a message"
						onChange={(event) => {
							setCurrentMessage(event.target.value)
						}}
						onKeyPress={(event) => {
							event.key === "Enter" && sendMessageHandler(event)
						}}
					/>
					<button onClick={sendMessageHandler}>
						&#9658;
					</button>
				</form>
			</div>
		</div>
	)
}

export default Chat;