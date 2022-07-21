import React from 'react';
import classes from './Messages.module.scss';
import ChatsList from './ChatsList';
import MessagesListContainer from './MessagesList';
import { Navigate } from 'react-router-dom';

function Messages(props) {
	if(!props.isAuthed) {
		return <Navigate replace to='/login'/>
	}  

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

export default Messages;