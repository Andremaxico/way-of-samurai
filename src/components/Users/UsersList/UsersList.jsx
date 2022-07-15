import React, { Component } from 'react';
import User from '../User';
import classes from '../Users.module.scss';
import * as axios from 'axios';

class UsersList extends React.Component {
	componentDidMount() {
		if(this.props.usersData.length < 1) {
			axios.get('https://social-network.samuraijs.com/api/1.0/users')
				.then(res => {
					this.props.setUsers(res.data.items)
				})
		}
	}
	render() {
		const list = this.props.usersData.map(data => <User info={data} key={data.id} follow={this.props.follow} unfollow={this.props.unfollow}/>);

		return (
			<div className={classes.UsersList}>
				{ list }
			</div>
		)
	}
}

export default UsersList;
