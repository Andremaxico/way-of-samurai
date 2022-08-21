import * as React from 'react';
import Chat from './Chat';
import classes from '../Messages.module.scss';
import { ChatsListPropsType } from './ChatsListContainer';

type PropsType = ChatsListPropsType;

const ChatsList: React.FC<PropsType> = ({usersInfo}) => {
	return (
		<div className={classes.chatsList}>
			{
				usersInfo.map(info => (
					<Chat userInfo={info} key={info.id}/>
				))
			}
		</div>
	)
}

export default ChatsList;
