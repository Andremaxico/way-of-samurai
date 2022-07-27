import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import Profile from './Profile';
import Preloader from '../../UI/Preloader';
//reducers
import { toggleIsFetchingAC } from '../../Redux/users-reducer';
import { setUserById, updateMyStatus } from '../../Redux/profile-reducer';
import { logout } from '../../Redux/auth-reducer';
//selectors
import { getIsAuthed } from '../../Redux/auth-selectors';
//hocs
import withRouter from '../../hocs/withRouter';
import { compose } from 'redux';
import { connect } from 'react-redux';

class ProfileContainer extends Component {
	userId = this.props.router.params.userId;

	componentDidMount() {
		//if current user defined or header request data and set my id 
		if(this.userId) {
			this.props.setUserById(this.userId).then(() => this.props.toggleIsFetching(false));
		}
	}

	render() {
		if (!this.props.isAuthed && !this.props.router.params.userId) return <Navigate to='/login' replace />

		if(this.props.isFetching ) {
			return <Preloader />
		}
		return (
			<Profile currUserProfileInfo={ this.userId
					? this.props.currUserProfileInfo
					: this.props.myProfileInfo
					}
					updateMyStatus={this.props.updateMyStatus}
					logout={this.props.logout}
			/>
		)
	}
}



const mapStateToProps = (state) => {
	return {
		currUserProfileInfo: state.profilePage.currUserProfileInfo,
		myProfileInfo: state.profilePage.myProfileInfo,
		myProfileId: state.auth.data.id,
		isFetching: state.usersPage.isFetching,
		isAuthed: getIsAuthed(state),
	}
}
const methods = {
	toggleIsFetching: toggleIsFetchingAC,
	setUserById,
	updateMyStatus,
	logout,
}

export default compose(
	connect(mapStateToProps, methods),
	withRouter,
)(ProfileContainer);
