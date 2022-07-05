import React from 'react';
import classes from './Messages.module.scss';
import Message from './Message/Message';
import Chat from './Chat/Chat';

export default function Messages() {
   const users = [
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Andriy',
		},

	]
	return (
		<div className={classes.messages}>
			<h2 className={classes.title}>Messages</h2>
			<div className={classes.content}>
				<div className={classes.chatsList}>
					<div className={classes.chat}>
						<Chat userInfo={users[0]} id='1'/>
					</div>
					<div className={classes.chat}>
						<Chat userInfo={users[0]} id='2'/>
					</div>
					<div className={classes.chat}>
						<Chat userInfo={users[0]} id='3'/>
					</div>
				</div>
				<div className={classes.currChatWrap}>
					<Message text='Hi' />
					<Message text='How are you?'/>
					<Message text='Hi'/>
					<Message text='Hi'/>
					<Message text='How are you?'/>
					<Message text='Hi'/>
				</div>
			</div>
		</div>
	)
}
