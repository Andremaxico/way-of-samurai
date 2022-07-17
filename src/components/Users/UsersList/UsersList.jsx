import React from 'react'
import User from '../../../UI/User/User';
import classes from '../Users.module.scss';

const UsersList = (props) => {
	const list = props.usersData.map(data => {
		<User info={data} key={data.id} follow={props.follow} unfollow={props.unfollow}/>
	});
	return (
		<div className={classes.usersList}>
			{ list }
		</div>
	)
}

export default UsersList;
