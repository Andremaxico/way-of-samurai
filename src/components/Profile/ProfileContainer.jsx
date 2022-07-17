import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from './Profile';
import { toggleIsFetchingAC } from '../../Redux/users-reducer';
import { setUserProfileInfo } from '../../Redux/profile-reducer';
import axios from 'axios';

class ProfileContainer extends Component {
	componentDidMount() {
		this.props.toggleIsFetching(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/3`)
			.then(res => {
				this.props.setUserProfileInfo(res.data);
			});
	}

	render() {
		return (
			<Profile {...this.props}/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currUserProfileInfo: state.profilePage.currUserProfileInfo,
		myProfileInfo: state.profilePage.myProfileInfo,
	}
}
const methods = {
	toggleIsFetching: toggleIsFetchingAC,
	setUserProfileInfo,
}


export default connect(mapStateToProps, methods)(ProfileContainer);
