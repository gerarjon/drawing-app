import React, { useEffect, useState, useRef } from 'react';

const Chat = ({socket, room, username}) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [isHidden, setIsHidden] = useState(true)

	const messagesEndRef = useRef(null);

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

	const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

	useEffect(() => {
		const listener = data => {
			setMessageList((prevList) => [...prevList, data])
		}
		socket.on("receive_message", listener)
		scrollToBottom();
		return () => socket.off("receive_message", listener)
	}, [socket, messageList])

	return (
		<div className='chatRoom__container'>
			<div className='chatRoom__header' onClick={()=>setIsHidden(!isHidden)} >
				<h3>RoomID: {isHidden ? "Click to Show" : room}</h3>
			</div>
			<div className='chatRoom__body'>
				{messageList.map((message, index) => {
					return(
						<div className='chatRoom__message' key={index}>
							<p>{message.author}: {message.message}</p>
						</div>
					)
				})}
				<div ref={messagesEndRef}></div>
			</div>
			<div className='chatRoom__footer'>
				<form>
					<input
						type="text"
						value={currentMessage}
						placeholder="Type a message..."
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