import React from 'react'
import classes from './Messages.module.scss';
import Message from './Message/Message';
import Chat from './Chat/Chat';

export default function Messages() {
   console.log('messages', classes);
	return (
		<div className={classes.messages}>
			<h2 className={classes.title}>Messages</h2>
			<div className={classes.content}>
				<div className={classes.chatsList}>
					<div className={classes.chat}>
						<Chat />
					</div>
					<div className={classes.chat}>
						<Chat />
					</div>
					<div className={classes.chat}>
						<Chat />
					</div>
				</div>
				<div className={classes.currChatWrap}>
					<Message text='Hi' />
					<Message text='How are you?'/>
					<Message text='Hi'/>
					<Message text='Hi'/>
				</div>
			</div>
		</div>
	)
}
