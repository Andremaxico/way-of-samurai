import React from 'react';
import classes from './Chat.module.scss';

const Chat = (props) => {
	const {} = props.data;
	return (
		<div className={classes.chat}>
			<div className={classes.avatarUrl}>
				<img src={props.data.avatarUrl} alt="" />
			</div>
			<div className={classes.body}>
				<p className={classes.name}></p>
				<p className={classes.lastMessage}></p>
				<p className={classes.sendDate}></p>
			</div>
		</div>
	)
}

export default Chat;
