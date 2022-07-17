import axios from 'axios';
import React, { Component } from 'react'
import UsersList from './UsersList';
import Preloader from '../../../UI/Preloader';
import { connect } from 'react-redux';
import {
	follow,
	unfollow,
	setUsers,
	setTotalUsersCount,
	toggleIsFetching,
	setCurrentPage,
} from '../../../Redux/usersReducer';
import PaginationContainer from '../../../UI/Pagination/PaginationContainer';

class UsersListContainer extends Component {
	componentDidMount() {
		//set preloader
		this.props.toggleIsFetching(true);

		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
			.then(res => {
				this.props.setTotalUsersCount(res.data.totalCount);
				this.props.setUsers(res.data.items)
				this.props.toggleIsFetching(false);
			})
	}

	render() {
		const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
		let pagesNumbers = [];
		for(let i = 1; i <= pagesCount; i++) pagesNumbers = [...pagesNumbers, i];


		if(this.props.isFetching) {
			return <Preloader />
		}
		return (
			<>
				<PaginationContainer pagesNumbers={pagesNumbers} currentPage={this.props.currentPage}/>
				<UsersList
					usersData={this.props.usersData} 
					follow={this.props.follow} unfollow={this.props.unfollow}
				/>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentPage: state.usersPage.currentPage,
		pageSize: state.usersPage.pageSize,
		usersData: state.usersPage.usersData,
		totalUsersCount: state.usersPage.totalUsersCount,
		isFetching: state.usersPage.isFetching,
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
