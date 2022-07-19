import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setAuthData } from '../../Redux/auth-reducer';
import { setMyProfileInfo } from '../../Redux/profile-reducer';

class Headercontainer extends Component {
	componentDidMount() {
		axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
			withCredentials: true,
		})
		.then(res => {
			if(res.data.resultCode === 0) {
				this.props.setAuthData(res.data.data);
			}
			return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${res.data.data.id}`);

		})
		.then(res => {
			this.props.setMyProfileInfo(res.data);
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
