import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from './Pagination';
import axios from 'axios';
import {
	setCurrentPage,
	toggleIsFetching,
	setUsers,
	setUsersPage,
} from '../../Redux/usersReducer';


class PaginationContainer extends Component {
	setCurrentPage = (num) => {
		//change current page
		this.props.setCurrentPage(num);

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
