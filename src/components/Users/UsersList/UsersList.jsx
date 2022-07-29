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

	//when loading
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
			<div className={classes.UsersList}>
				{ list }
			</div>
		</div>
	)
}

export default UsersList;
