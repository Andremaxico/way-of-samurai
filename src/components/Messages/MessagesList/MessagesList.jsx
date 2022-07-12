import React from 'react';
import classes from '../Messages.module.scss';
import Message from '../../../UI/Message';

const MessagesList = (props) => {
	const list = props.messagesData.map(data => <Message text={data.text} isMy={data.isMy} key={data.id}/>);
	return (
		<div className={classes.MessagesList}>
			{ list }
		</div>
	)
}

export default MessagesList;
