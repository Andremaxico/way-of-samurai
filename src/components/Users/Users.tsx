import * as React from 'react';
import classes from './Users.module.scss';
import UsersHeader from './UsersHeader';
import UsersListContainer from './UsersList';

type PropsType = {}

const Users: React.FC<PropsType> = (props) => {
	return (
		<div className={classes.Users}>
			<UsersHeader />
			<UsersListContainer />
		</div>
	)
}



export default Users;