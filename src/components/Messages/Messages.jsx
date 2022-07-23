import React from 'react'
import withAuthRedirect from '../../hocs/withRedirect';
import ChatsListContainer from './ChatsList';
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

export default withAuthRedirect(Messages);
