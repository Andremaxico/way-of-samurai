import React from 'react';
import classes from './Messages.module.scss';
import ChatsList from './ChatsList';
import MessagesListContainer from './MessagesList';

export default function Messages(props) {
	return (
		<div className={classes.messages}>
			<h2 className={classes.title}>Messages</h2>
			<div className={classes.content}>
				<ChatsList usersInfo={props.data.usersInfo}/>
				<MessagesListContainer />
			</div>
		</div>
	)
}
