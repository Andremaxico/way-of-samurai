import React from 'react';
import { connect } from "react-redux"
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC } from "../../../Redux/users-reducer";
import UsersList from "./UsersList";
import * as axios from 'axios';

class UsersListContainer extends React.Component {
	componentDidMount() {
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pagesSize}`)
			.then(res => {
				this.props.setUsers(res.data.items);
				this.props.setTotalCount(res.data.totalCount);
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
				}}
				methods={{
					setCurrentPage: this.props.setCurrentPage,
					setUsers: this.props.setUsers,
					follow: this.props.follow,
					unfollow: this.props.unfollow
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
	}
}

const mapDispatchToProps = (dispatch) => {
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
		}
	}
}

export default  connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);