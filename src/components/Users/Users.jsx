import React from 'react';
import classes from './Users.module.scss';
import UsersList from './UsersList';
import withNetworkErrorCheck from '../../hocs/withNetworkCheck';

const Users = (props) => {
	return (
		<div className={classes.Users}>
			<h2 className={classes.title}>Users</h2>
			<UsersList />
		</div>
	)
}

export default withNetworkErrorCheck(Users);
