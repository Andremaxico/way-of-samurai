import React from 'react';
import Chat from './Chat/Chat';
import classes from '../Messages.module.scss';

export const ChatsList = (props) => {
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
