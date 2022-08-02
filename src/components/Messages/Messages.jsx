import React from 'react'
import withLoginRedirect from '../../hocs/withLoginRedirect';
import ChatsListContainer from './ChatsList/ChatsListContainer';
import CurrentChatContainer from './CurrentChat';
import classes from './Messages.module.scss';


const Messages = (props) => {
	return (
		<div className={classes.Messages}>
			<ChatsListContainer />
			<CurrentChatContainer />
		</div>
	)
}

export default withLoginRedirect(Messages);
