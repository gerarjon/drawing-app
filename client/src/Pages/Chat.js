import React, { useEffect, useState, useRef } from 'react';
import Canvas from '../Modules/Canvas';

const Chat = ({socket, room, username}) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	// const [userList, setUserList] = useState([]);
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

		const listenMessage = arg => {
			const data = {
					room: room,
					author: "connect",
					message: arg,
					time: 
						new Date(Date.now()).getHours() +
						new Date(Date.now()).getMinutes(),
			};
			setMessageList((prevList => [...prevList, data]))
		}
		socket.on("join_message", listenMessage)

		scrollToBottom();
		return () => socket.removeAllListeners();
	}, [socket, messageList, room])

	return (
		<div className='main__container container' id="main">
			{/* player room */}
			<div className='playerRoom__container'>

			</div>


			{/* canvas */}
			<div className='canvas__container'>
				<div className='canvas__body'>
					<Canvas />
				</div>
				<div className='canvas__footer'>

				</div>
			</div>


			{/* chat room  */}
			<div className='chatRoom__container'>
				<div className='chatRoom__header' onClick={()=>setIsHidden(!isHidden)} >
					<h3>RoomID: {isHidden ? "Click to Show" : room}</h3>
				</div>
				<div className='chatRoom__body'>
					{messageList.map((message, index) => {
						return(
							<div className='chatRoom__message' key={index}>
								{
									message.author === "connect" ? 
										<p style={{color: "green" , fontWeight: "bold"}}>{message.message}</p> :
										<p><strong>{message.author}:</strong> {message.message}</p>
								}
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
							placeholder="Enter message..."
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
		</div>
	)
}

export default Chat;