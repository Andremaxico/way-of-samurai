import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from './Pagination';
import axios from 'axios';
import {
	setCurrentPage,
	toggleIsFetching,
	setUsers,
} from '../../Redux/usersReducer';


class PaginationContainer extends Component {
	setCurrentPage = (num) => {
		//change current page
		this.props.setCurrentPage(num);

		//toggle is fetching
		this.props.toggleIsFetching(true);

		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${num}&count=${this.props.pageSize}`)
			.then(res => {
				this.props.setUsers(res.data.items)
				this.props.toggleIsFetching(false);
			})

	}

	render() {
		return (
			<Pagination 
				pagesNumbers={this.props.pagesNumbers} 
				setCurrentPage={ this.setCurrentPage } currentPage={this.props.currentPage}
			/>
		)
	}
}

const methods = {
	setCurrentPage,
	toggleIsFetching,
	setUsers,
}

export default connect(null, methods)(PaginationContainer);
