import React from 'react';
import classes from './Users.module.scss';
import UsersListContainer from './UsersList';

const Users = (props) => {
	return (
		<div className={classes.Users}>
			<h1 className={classes.title}>Users</h1>
			<UsersListContainer />
		</div>
	)
}

export default Users;