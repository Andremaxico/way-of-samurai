import React from 'react';
import User from '../User';
import classes from '../Users.module.scss';
import UsersPaginationContainer from '../UsersPagination';
import Preloader from '../../../UI/Preloader/Preloader';

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

	if(props.state.isFetching) {
		return <Preloader />
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
					toggleIsFetching: props.methods.toggleIsFetching,
				}}
			/>
			{ list }
		</div>
	)
}

export default UsersList;
