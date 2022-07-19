import React from 'react';
import { connect } from "react-redux"
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC, toggleFollowingInProgress } from "../../../Redux/users-reducer";
import UsersList from './UsersList';
import { usersAPI } from '../../../api/api';

class UsersListContainer extends React.Component {
	componentDidMount() {
		//sets preloader
		this.props.toggleIsFetching(true);

		usersAPI.getUsersPage(this.props.currentPage, this.props.pagesSize)
		.then(res => {
				this.props.setUsers(res.items);
				this.props.setTotalCount(res.totalCount);
				this.props.toggleIsFetching(false);
			})
			
	}
	
	setCurrentPage = (num) => {
		//sets preloader
		this.props.toggleIsFetching(true);

		//changes users-page number
		this.props.setCurrentPage(num);

		//get current users-page with number
		usersAPI.getUsersPage(num, this.props.pagesSize)
				.then(res => {
					this.props.setUsers(res.items);
					this.props.toggleIsFetching(false);
				})
	}

	render() {
		return (
			<UsersList {...this.props} setCurrentPage={this.setCurrentPage}/>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		usersData: state.usersPage.usersData,
		totalUsersCount: state.usersPage.totalUsersCount,
		pagesSize: state.usersPage.pagesSize,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress,
	}
}

/*const mapDispatchToProps = (dispatch) => {
	return {
		follow: (userId) => {
			const action = followAC(userId);
			dispatch(action);
		},
		unfollow: (userId) => {
			const action = unfollowAC(userId);
			dispatch(action);
		},
		setUsers: (users, totalUsersCount) => {
			const action = setUsersAC(users, totalUsersCount);
			dispatch(action);
		},
		setCurrentPage: (pageNumber) => {
			const action = setCurrentPageAC(pageNumber);
			dispatch(action);
		},
		setTotalCount: (totalCount) => {
			const action = setTotalUsersCountAC(totalCount);
			dispatch(action);
		},
		toggleIsFetching: (isFetching) => {
			const action = toggleIsFetchingAC(isFetching);
			dispatch(action);
		}
	}
}*/

const mdtp = {
	follow: followAC,
	unfollow: unfollowAC,
	setUsers: setUsersAC,
	setTotalCount: setTotalUsersCountAC,
	setCurrentPage: setCurrentPageAC,
	toggleIsFetching: toggleIsFetchingAC,
	toggleFollowingInProgress,
}
export default  connect(mapStateToProps, mdtp)(UsersListContainer);