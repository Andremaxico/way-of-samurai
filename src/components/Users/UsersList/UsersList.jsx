import React from 'react';
import User from '../User';
import classes from '../Users.module.scss';
import * as axios from 'axios';

const UsersList = (props) => {
	if(props.usersData.length < 1) {
		axios.get('https://social-network.samuraijs.com/api/1.0/users')
			.then(res => {
				props.setUsers(res.data.items)
			})
		}
	const list = props.usersData.map(data => <User info={data} key={data.id} follow={props.follow} unfollow={props.unfollow}/>);
	return (
		<div className={classes.UsersList}>
			{ list }
		</div>
	)
}

export default UsersList;
