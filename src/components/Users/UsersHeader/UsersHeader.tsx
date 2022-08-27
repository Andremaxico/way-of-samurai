import * as React from 'react';
import classes from '../Users.module.scss';
import UsersSearch from '../UsersSearch';

type PropsType = {};

const UsersHeader: React.FC<PropsType> = () => {
	return (
		<div className={classes.UsersHeader}>
			<h1 className={classes.title}>Users</h1>
			<UsersSearch />
		</div>
	)
}

export default UsersHeader