import React from 'react';
import classes from '../Messages.module.scss';
import MessagesList from '../MessagesList';
import WriteMessage from '../WriteMessage';

const CurrentChat = (props) => {
	return (
		<div className={classes.CurrentChat}>
			<MessagesList messagesData={props.messagesList}/>
			<WriteMessage 
				methods={{
					sendMessage: props.sendMessage, 
					updateNewMessageValue: props.updateNewMessageValue
				}} 
				newMessageValue={props.newMessageValue}
			/>
		</div>
	)
}

export default CurrentChat;
