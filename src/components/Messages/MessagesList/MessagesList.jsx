import React from 'react'
import classes from '../Messages.module.scss';
import Message from './Message/Message';

export const MessagesList = (props) => {
  return (
	<div className={classes.currChatWrap}> 
		{
			props.messagesData.map(data => <Message data={data} />)
		}
	</div>
  )
}
