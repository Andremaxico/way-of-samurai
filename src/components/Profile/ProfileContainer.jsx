import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Profile from './Profile';
import Preloader from '../../UI/Preloader';
//reducers
import { toggleIsFetchingAC } from '../../Redux/users-reducer';
import { setUserById, updateMyStatus, setAvatar } from '../../Redux/profile-reducer';
import { logout } from '../../Redux/auth-reducer';
//selectors
import { getIsAuthed } from '../../Redux/auth-selectors';
//hocs
import withRouter from '../../hocs/withRouter';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withNetworkRedirect from '../../hocs/withNetworkRedirect';

const ProfileContainer = (props) => {
	const [userId, setUserId] = useState(null);
	//if we render other user profile, we set const userId
	useEffect(() => {
		if(props.router.params.userId) {
			//set const for show user profile
			setUserId(props.router.params.userId);
		} else {
			//set const to null to show my profile
			setUserId(null);
		}

	}, [props.router.params.userId]);

	//set currUserProfileInfo in state if we got userId
	useEffect(() => {
		//if we get other user id, we set this with thunk
		if(userId) {
			props.setUserById(userId).then(() => props.toggleIsFetching(false));
		}
	}, [userId])

	if (!props.isAuthed && !props.router.params.userId) return <Navigate to='/login' replace />

	if(props.isFetching ) {
		return <Preloader />
	}
	return (
		<Profile currUserProfileInfo={ userId
				? props.currUserProfileInfo
				: props.myProfileInfo
				}
				updateMyStatus={props.updateMyStatus}
				logout={props.logout}
				setAvatar={props.setAvatar}
		/>
	)
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
	setAvatar,
}

export default compose(
	connect(mapStateToProps, methods),
	withNetworkRedirect,
	withRouter,
)(ProfileContainer);
