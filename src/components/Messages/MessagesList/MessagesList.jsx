import React from 'react'
import classes from '../Messages.module.scss';
import { WriteForm } from '../WriteMessage/WriteMessage';
import Message from './Message/Message';

export const MessagesList = (props) => {
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
			<WriteForm 
				dispatch={props.dispatch}
				newMessageValue={props.newMessageValue}
			/>
		</div>
	)
}
