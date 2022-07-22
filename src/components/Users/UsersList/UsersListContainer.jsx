import React, { Component } from 'react'
import UsersList from './UsersList';
import Preloader from '../../../UI/Preloader';
import { connect } from 'react-redux';
import {
	follow,
	unfollow,
	setCurrentPage,
	setUsersPage,
} from '../../../Redux/usersReducer';
import Pagination from '../../../UI/Pagination/Pagination';

class UsersListContainer extends Component {

	componentDidMount() {
		this.props.setUsersPage(this.props.currentPage, this.props.pageSize);
	}

	changeUsersPage = (num) => {
		this.props.setUsersPage(num, this.props.pageSize);
	}

	render() {
		//number
		const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

		// 0 < array length > number 
		let pagesNumbers = [];
		for(let i = 1; i <= pagesCount; i++) pagesNumbers = [...pagesNumbers, i];

		//when loading data from server
		if(this.props.isFetching) {
			return <Preloader />
		}

		return (
			<>
				<Pagination
					pagesNumbers={pagesNumbers} 
					currentPage={this.props.currentPage}
					changePage={this.changeUsersPage}
				/>
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
	setCurrentPage,
	setUsersPage,
}

export default connect(mapStateToProps, methods)(UsersListContainer);
