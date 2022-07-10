import React from 'react';
import Chat from './Chat';
import classes from '../Messages.module.scss';

const ChatsList = (props) => {
	return (
		<div className={classes.chatsList}>
			{
				props.usersInfo.map(info => (
					<Chat userInfo={info} key={info.id}/>
				))
			}
		</div>
	)
}

export default ChatsList;
