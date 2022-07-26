import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setAuthData } from '../../Redux/auth-reducer';
import { setMyProfileInfo } from '../../Redux/profile-reducer';

class Headercontainer extends Component {

	render() {
		return (
			<Header 
				isAuthed={this.props.authData.isAuthed} 
				login={this.props.authData.login}
				avatarUrl={this.props.myProfileInfo?.photos ?
							  this.props.myProfileInfo.photos.small : ''}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authData: state.auth.data,
		myProfileInfo: state.profilePage.myProfileInfo ,
	}
}

const methods = {
	setAuthData,
	setMyProfileInfo,
}
export default connect(mapStateToProps, methods)(Headercontainer);
