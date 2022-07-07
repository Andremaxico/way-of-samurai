import React from 'react';
import classes from './Messages.module.scss';
import { ChatsList } from './ChatsList/ChatsList';
import { MessagesList } from './MessagesList/MessagesList';

export default function Messages(props) {
	return (
		<div className={classes.messages}>
			<h2 className={classes.title}>Messages</h2>
			<div className={classes.content}>
				<ChatsList usersInfo={props.data.usersInfo}/>
				<MessagesList 
					messagesData={props.data.messagesData} 
					newMessageValue={props.data.newMessageValue}
					addMessage={props.methods.addMessage}
					updateNewMessageValue={props.methods.updateNewMessageValue}
				/>
			</div>
		</div>
	)
}
