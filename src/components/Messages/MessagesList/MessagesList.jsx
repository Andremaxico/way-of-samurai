import React from 'react'
import classes from '../Messages.module.scss';
import WriteMessageContainer from '../WriteMessage';
import Message from './Message';

const MessagesList = (props) => {
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
			<WriteMessageContainer
				dispatch={props.dispatch}
				newMessageValue={props.newMessageValue}
			/>
		</div>
	)
}

export default MessagesList;