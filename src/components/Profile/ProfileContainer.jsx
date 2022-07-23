import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRouter from '../../hocs/withRouter';
import withAuthRedirect from '../../hocs/withRedirect';
import Preloader from '../../UI/Preloader';
import Profile from './Profile'; 
import { setUserProfileData, setMyProfileData } from '../../Redux/profileReducer';

class ProfileContainer extends Component {
	componentDidMount() {
		const userId = this.props.router.params.userId || this.props.myProfileId;

		if(userId) {
			this.props.setUserProfileData(userId);
		}
	}

	render() {
		if(this.props.isFetching) return <Preloader />

		return (
			<Profile profileData={this.props.router.params.userId 
			? this.props.currUserProfileData 
			: this.props.myProfileData}/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
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
	withAuthRedirect,
)(ProfileContainer);