import  * as React from 'react';
import classes from './Messages.module.scss';
import ChatsListContainer from './ChatsList';
import MessagesListContainer from './MessagesList';
import withLoginRedirect from '../../hocs/withLoginRedirect';

type PropsType = {}

function Messages(props: PropsType) {
	return (
		<div className={classes.messages}>
			<h2 className={classes.title}>Messages</h2>
			<div className={classes.content}>
				<ChatsListContainer />
				<MessagesListContainer />
			</div>
		</div>
	)
}

export default withLoginRedirect(Messages);