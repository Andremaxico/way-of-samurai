import React from 'react';
import { connect } from "react-redux"
import { follow, unfollow, setCurrentPageAC, getUsers
} from "../../../Redux/users-reducer";
import { selectPageSize, selectPagesNumbers, selectTotalUsersCount, selectUsersData } from '../../../Redux/users-selectors';
import UsersList from './UsersList';

class UsersListContainer extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pagesSize);
	}
	
	setCurrentPage = (num) => {
		//changes current users-page number
		this.props.setCurrentPage(num);

		this.props.getUsers(num, this.props.pagesSize);

	}

	render() {
		return (
			<UsersList {...this.props} setCurrentPage={this.setCurrentPage}/>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		usersData: selectUsersData(state),
		usersPagesNumbers: selectPagesNumbers(state),
		totalUsersCount: selectTotalUsersCount(state),
		pagesSize: selectPageSize(state),
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
	follow,
	unfollow,
	setCurrentPage: setCurrentPageAC,
	getUsers,
}
export default  connect(mapStateToProps, mdtp)(UsersListContainer);