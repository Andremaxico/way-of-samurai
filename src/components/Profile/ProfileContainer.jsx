import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRouter from '../../hocs/withRouter';
import withLoginRedirect from '../../hocs/withLoginRedirect';
import Preloader from '../../UI/Preloader';
import Profile from './Profile'; 
import { setUserProfileData, setMyProfileData } from '../../Redux/profileReducer';
import { Navigate } from 'react-router-dom';
import NotAuthorized from '../../UI/NotAuthorized/NotAuthorized';

const ProfileContainer = (props) => {
	useEffect(() => {
		const userId = props.router.params?.userId || props.myProfileData?.userId;
		if(userId) {
			props.setUserProfileData(userId);
		}
	}, [props.router?.params?.userId, props.myProfileData]);


	if(props.isFetching) return <Preloader />
	if(!props.router.params.userId && !props.isAuthed) return <NotAuthorized />;

	return (
		<Profile profileData={props.router.params.userId 
		? props.currUserProfileData 
		: props.myProfileData}/>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthed: state.auth.isAuthed,
		isFetching: state.usersPage.isFetching,
		myProfileData: state.profilePage.myProfileData,
		currUserProfileData: state.profilePage.currentUserProfileData,
	}
}

const methods = {
	setUserProfileData,
	setMyProfileData,
}

export default compose(
	connect(mapStateToProps, methods),
	withRouter,
)(ProfileContainer);