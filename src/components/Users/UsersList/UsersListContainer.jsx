import React from 'react';
import { connect } from "react-redux"
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC } from "../../../Redux/users-reducer";
import UsersList from "./UsersList";
import * as axios from 'axios';

class UsersListContainer extends React.Component {
	componentDidMount() {
		//sets preloader
		this.props.toggleIsFetching(true);

		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pagesSize}`)
			.then(res => {
				this.props.setUsers(res.data.items);
				this.props.setTotalCount(res.data.totalCount);
				this.props.toggleIsFetching(false);
			})
			
	}
	
	render() {
		return (
			<UsersList 
				state={{
					currentPage: this.props.currentPage, 
					pagesSize: this.props.pagesSize,
					usersData: this.props.usersData,
					totalUsersCount: this.props.totalUsersCount,
					isFetching: this.props.isFetching
				}}
				methods={{
					setCurrentPage: this.props.setCurrentPage,
					setUsers: this.props.setUsers,
					follow: this.props.follow,
					unfollow: this.props.unfollow,
					toggleIsFetching: this.props.toggleIsFetching,
				}}
			/>
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
}
export default  connect(mapStateToProps, mdtp)(UsersListContainer);