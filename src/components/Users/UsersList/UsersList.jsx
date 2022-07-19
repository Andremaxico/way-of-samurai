import React from 'react';
import User from '../User';
import classes from '../Users.module.scss';
import UsersPaginationContainer from '../UsersPagination';
import Preloader from '../../../UI/Preloader/Preloader';

const UsersList = (props) => {
	const list = props.usersData.map(data => {
		return (
			<User 
				info={data} key={data.id} 
				follow={props.follow} unfollow={props.unfollow}
			/>
		)
	});

	const pagesCount = Math.ceil(props.totalUsersCount / props.pagesSize);
	let pagesNumbers = [];
	
	for(let i = 1; i <= pagesCount; i++) {
		pagesNumbers.push(i);
	} 

	if(props.isFetching) {
		return <Preloader />
	}
	return (
		<div className={classes.UsersList}>
			<UsersPaginationContainer 
				state={{
					...props,
					pagesNumbers: pagesNumbers,
				}}
				methods={{
					setUsers: props.setUsers,
					setCurrentPage: props.setCurrentPage,
					toggleIsFetching: props.toggleIsFetching,
				}}
			/>
			{ list }
		</div>
	)
}

export default UsersList;
