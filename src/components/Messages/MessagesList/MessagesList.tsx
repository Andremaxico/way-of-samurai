import * as React from 'react'
import classes from '../Messages.module.scss';
import WriteMessageContainer from '../WriteMessage';
import Message from './Message';
import { MessagesListPropsType } from './MessagesListContainer';

type PropsType = MessagesListPropsType;

const MessagesList: React.FC<PropsType> = (props) => {
	const list = props.messagesData.map((data, index) => {
		if(data.isMy) {
			return <Message isMy data={data} key={index}/>
		} else {
			return <Message data={data} key={index}/>
		}
	});
	return (
		<div className={classes.currChatWrap}> 
			{ list }
			<WriteMessageContainer />
		</div>
	)
}

export default MessagesList;