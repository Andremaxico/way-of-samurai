import axios from 'axios';
import React, { Component } from 'react'
import UsersList from './UsersList';
import {
	follow,
	unfollow,
	setUsers,
	setTotalUsersCount,
	toggleIsFetching,
	setCurrentPage,
} from '../../../Redux/usersReducer';

class UsersListContainer extends Component {
	componentDidMount() {
		//set preloader
		props.toggleIsFetching(true);

		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
			.then(res => {
				this.props.setTotalUsersCount(res.data.totalCount);
				this.props.setUsers(res.data.items);
				this.props.toggleIsFetching(false);
			})
	}

	render() {
		return (
			<UsersList
				usersData={this.props.usersData} 
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentPage: state.usersPage.currentPage,
		pageSize: state.usersPage.pageSize,
		usersData: state.usersPage.usersData,
	}
}

const methods = {
	follow,
	unfollow,
	setUsers,
	setTotalUsersCount,
	toggleIsFetching,
	setCurrentPage,
}

export default connect(mapStateToProps, methods)(UsersListContainer);
