import React from 'react';
import classes from './Messages.module.scss';
import Message from './Message/Message';
import Chat from './Chat/Chat';

export default function Messages() {
   const usersData = [
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Andriy',
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Ivan',
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Vasya',
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'David',
		},
	];
	const messagesData = [
		{
			text: 'Hi',
		},
		{
			text: 'How are you?',
		},
		{
			text: 'Where are you?',
		},
		{
			text: 'Want to home?...',
		},
		{
			text: 'Me too...:(',
		},
	]
	return (
		<div className={classes.messages}>
			<h2 className={classes.title}>Messages</h2>
			<div className={classes.content}>
				<div className={classes.chatsList}>
					{
						usersData.map((info, index) => (
							<div className={classes.chat} key={index}>
								<Chat userInfo={info} id={index+1}/>
							</div>
						))
					}
				</div>
				<div className={classes.currChatWrap}> 
					{
						messagesData.map((data, index) => <Message data={data} />)
					}
				</div>
			</div>
		</div>
	)
}
