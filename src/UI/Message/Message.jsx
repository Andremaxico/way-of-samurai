import React from 'react';
import classes from './Message.module.scss';

const Message = (props) => {
	return (
		<div className={props.isMy ? `${classes.Message} ${classes._myMessage}` : classes.Message}>
			<p className={classes.text}>{props.text}</p>
		</div>
	)
}

export default Message;