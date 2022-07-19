import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setAuthData } from '../../Redux/auth-reducer';
import { setMyProfileInfo } from '../../Redux/profile-reducer';
import { authAPI, usersAPI } from '../../api/api';

class Headercontainer extends Component {
	componentDidMount() {
		authAPI.getAuthInfo().then(res => {
			if(res.resultCode === 0) {
				this.props.setAuthData(res.data);
			}
			
			return usersAPI.getUserById(res.data.id);

		})
		.then(data => {
			this.props.setMyProfileInfo(data);
		})
	}

	render() {
		return (
			<Header 
				isAuthed={this.props.authData.isAuthed} 
				login={this.props.authData.login}
				avatarUrl={this.props.myProfileInfo.photos ?
							  this.props.myProfileInfo.photos.small : ''}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authData: state.auth.data,
		myProfileInfo: state.profilePage.myProfileInfo,
	}
}

const methods = {
	setAuthData,
	setMyProfileInfo,
}
export default connect(mapStateToProps, methods)(Headercontainer);
