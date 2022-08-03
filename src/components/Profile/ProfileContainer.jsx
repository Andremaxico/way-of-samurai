import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRouter from '../../hocs/withRouter';
import withLoginRedirect from '../../hocs/withLoginRedirect';
import Preloader from '../../UI/Preloader';
import Profile from './Profile'; 
import { setUserProfileData, setMyProfileData } from '../../Redux/profileReducer';
import { Navigate } from 'react-router-dom';

class ProfileContainer extends Component {
	componentDidMount() {
		const userId = this.props.router.params.userId || this.props.myProfileId;
		if(userId) {
			this.props.setUserProfileData(userId);
		}
	}

	render() {
		if(this.props.isFetching) return <Preloader />
		if(!this.props.router.params.userId && !this.props.isAuthed) return <Navigate to='/login' replace/>

		return (
			<Profile profileData={this.props.router.params.userId 
			? this.props.currUserProfileData 
			: this.props.myProfileData}/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthed: state.auth.isAuthed,
		isFetching: state.usersPage.isFetching,
		myProfileId: state.profilePage.myProfileData.userId,
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