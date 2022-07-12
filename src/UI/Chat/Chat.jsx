import React from 'react';
import classes from './Chat.module.scss';

const Chat = (props) => {
	const {avatarUrl: avatarUrl, 
			name: name, 
			lastMessage: lastMessage, 
			sendDate: sendDate} = props.data;
	return (
		<div className={classes.chat}>
			<div className={classes.userAvatar}>
				<img src={avatarUrl} alt="" />
			</div>
			<div className={classes.body}>
				<p className={classes.name}>{name}</p>
				<p className={classes.lastMessage}>{lastMessage}</p>
				<p className={classes.sendDate}>{sendDate}</p>
			</div>
		</div>
	)
}

export default Chat;
