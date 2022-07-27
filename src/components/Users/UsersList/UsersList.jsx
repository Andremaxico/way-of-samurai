import React from 'react';
import User from '../User/User';
import classes from '../Users.module.scss';
import Preloader from '../../../UI/Preloader/Preloader';
import UsersPagination from '../UsersPagination/UsersPagination';

const UsersList = (props) => {
	const list = props.usersData.map(data => {
		return (
			<User 
				info={data} key={data.id} 
				follow={props.follow} unfollow={props.unfollow}
				followingInProgress={props.followingInProgress}
			/>
		)
	});

	//pagination numbers
	/*const pagesCount = Math.ceil(props.totalUsersCount / props.pagesSize);
	let pagesNumbers = [];
	
	for(let i = 1; i <= pagesCount; i++) {
		pagesNumbers.push(i);
	} */

	//if loading
	if(props.isFetching) {
		return <Preloader />
	}
	return (
		<div className={classes.UsersList}>
			<UsersPagination 
				pagesNumbers={props.usersPagesNumbers}
				currentPage={props.currentPage}
				setCurrentPage={props.setCurrentPage}
			/>
			{ list }
		</div>
	)
}

export default UsersList;
