import React from 'react';
import User from '../User';
import classes from '../Users.module.scss';
import UsersPaginationContainer from '../UsersPagination';

const UsersList = (props) => {
	const list = props.state.usersData.map(data => {
		return (
			<User 
				info={data} key={data.id} 
				follow={props.methods.follow} unfollow={props.methods.unfollow}
			/>
		)
	});

	const pagesCount = Math.ceil(props.state.totalUsersCount / props.state.pagesSize);
	let pagesNumbers = [];
	for(let i = 1; i <= pagesCount; i++) {
		pagesNumbers.push(i);
	}

	if(props.state.usersData.length < 1) {
		return <h2 className={classes.loadingText}>Loading...</h2>
	}
	return (
		<div className={classes.UsersList}>

			<UsersPaginationContainer 
				state={{
					...props.state,
					pagesNumbers: pagesNumbers,
				}}
				methods={{
					setUsers: props.methods.setUsers,
					setCurrentPage: props.methods.setCurrentPage,
				}}
			/>
			{ list }
		</div>
	)
}

export default UsersList;
