import React from 'react';
import User from '../User';
import classes from '../Users.module.scss';

const UsersList = (props) => {
	if(props.usersData.length < 1) {
		props.setUsers([
			{
				id: 1,
				name: 'Maks',
				description: 'Love Christmas',
				avatarUrl: 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png',
				isFollowed: false,
				location: {
					city: 'Chernivtsi',
					country: 'Ukraine',
				}
			},
			{
				id: 2,
				name: 'Maria',
				description: 'My name is Masha',
				avatarUrl: 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png',
				isFollowed: true,
				location: {
					city: 'Kharkiv',
					country: 'Ukraine',
				}
			},
			{
				id: 3,
				name: 'David',
				description: 'I like pizza',
				avatarUrl: 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png',
				isFollowed: false,
				location: {
					city: 'Lviv',
					country: 'Ukraine',
				}
			},
		]);
	}
	const list = props.usersData.map(data => <User info={data} key={data.id} follow={props.follow} unfollow={props.unfollow}/>);
	return (
		<div className={classes.UsersList}>
			{ list }
		</div>
	)
}

export default UsersList;
