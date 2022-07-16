import React, { Component } from 'react';
import UsersPagination from "./UsersPagination";
import * as axios from 'axios';
import { connect } from 'react-redux';

class UsersPaginationContainer extends Component {
	constructor(props) {
		super(props);
		
		this.setCurrentPage = this.setCurrentPage.bind(this);
	}
	setCurrentPage (num)  {
		//sets preloader
		this.props.methods.toggleIsFetching(true);

		//changes users-page number
		this.props.methods.setCurrentPage(num);

		//get current users-page with number
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${num}&count=${this.props.state.pagesSize}`)
				.then(res => {
					this.props.methods.setUsers(res.data.items);

					this.props.methods.toggleIsFetching(false);
				})
	}

	render() {
		return (
			<UsersPagination 
				pagesNumbers={this.props.state.pagesNumbers}
				currentPage={this.props.state.currentPage}
				setCurrentPage={this.setCurrentPage}
			/>
		);
	}
}


export default connect()(UsersPaginationContainer);