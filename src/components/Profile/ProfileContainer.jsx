import React, { useState, useEffect } from 'react';
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

const ProfileContainer = (props) => {
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if(props.router.params.userId) {
			setUserId(props.router.params.userId);
		} else {
			setUserId(null);
		}

	}, [props.router.params.userId]);

	useEffect(() => {
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
}

export default compose(
	connect(mapStateToProps, methods),
	withRouter,
)(ProfileContainer);
