import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from './Profile';
import { toggleIsFetchingAC } from '../../Redux/users-reducer';
import { getUserById } from '../../Redux/profile-reducer';
import { setUserProfileInfo, setMyProfileInfo, updateMyStatus } from '../../Redux/profile-reducer';
import withRouter from '../../hocs/withRouter';
import withLoginRedirect from '../../hocs/withLoginRedirect';
import { compose } from 'redux';
import Preloader from '../../UI/Preloader';

class ProfileContainer extends Component {
	userId = this.props.router.params.userId || this.props.myProfileId;

	componentDidMount() {
		//if current user defined or header request data and set my id 
		if(this.userId === this.props.router.params.userId) {
			this.props.getUserById(this.userId);
			this.props.toggleIsFetching(false);
		}
	}

	/*componentDidUpdate() {
		if(!this.props.router.params.userId) {
			//this.props.getUserById(this.props.myProfileId);
		}
	}*/

	render() {
		if(this.props.isFetching) {
			return <Preloader />
		}
		return (
			<Profile currUserProfileInfo={ this.userId !== this.props.router.params.userId
					? this.props.myProfileInfo
					: this.props.currUserProfileInfo
					}
					updateMyStatus={this.props.updateMyStatus}
			/>
		)
	}
}



const mapStateToProps = (state) => {
	return {
		currUserProfileInfo: state.profilePage.currUserProfileInfo,
		myProfileInfo: state.profilePage.myProfileInfo,
		myProfileId: state.auth.data.id,
		isFetching: state.usersPage.isFetching
	}
}
const methods = {
	toggleIsFetching: toggleIsFetchingAC,
	getUserById,
	updateMyStatus,
}

export default compose(
	connect(mapStateToProps, methods),
	withRouter,
)(ProfileContainer);
