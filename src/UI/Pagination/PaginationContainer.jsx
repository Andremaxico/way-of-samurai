import React, { Component } from 'react';
import Pagination from './Pagination';

class PaginationContainer extends Component {
	componentDidMount() {

	}

	changePage(num) {
		//change current page
		this.props.setCurrentPage(num);

		//toggle is fetching
		this.props.toggleIsFetching(true);

	}

	render() {
		return (
			<Pagination />
		)
	}
}

export default PaginationContainer;
