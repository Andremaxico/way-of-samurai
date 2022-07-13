import { connect } from "react-redux"
import { followAC, unfollowAC, setUsersAC } from "../../../Redux/users-reducer";
import UsersList from "./UsersList"

const mapStateToProps = (state) => {
	return {
		usersData: state.usersPage.usersData,
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
		setUsers: (users) => {
			const action = setUsersAC(users);
			dispatch(action);
		},
	}
}

const UsersListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default UsersListContainer;