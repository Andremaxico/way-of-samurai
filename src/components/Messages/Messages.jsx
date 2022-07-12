import React from 'react'
import ChatsListContainer from './ChatsList/ChatsListContainer';
import classes from './Messages.module.scss';

const Messages = (props) => {
	return (
		<div className={classes.Messages}>
			<ChatsListContainer />
			<CurrentChat />
		</div>
	)
}

export default Messages;
