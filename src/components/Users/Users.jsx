import React from 'react';
import classes from './Users.module.scss';
import UsersList from './UsersList';

const Users = (props) => {
	return (
		<div className={classes.Users}>
			<h2 className={classes.title}>Users</h2>
			<UsersList />
		</div>
	)
}

export default Users;
