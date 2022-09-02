import * as React from 'react';
import classes from './Users.module.scss';
import UsersHeader from './UsersHeader';
import UsersList from './UsersList';

type PropsType = {}

const Users: React.FC<PropsType> = (props) => {
	return (
		<div className={classes.Users}>
			<UsersHeader />
			<UsersList />
		</div>
	)
}



export default Users;