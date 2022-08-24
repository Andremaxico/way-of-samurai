import  * as React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { authActions } from '../../Redux/auth-reducer';
import { profileActions } from '../../Redux/profile-reducer';
import {RootStateType} from  '../../Redux/redux-store';
import { AuthDataType, ProfileInfoType } from '../../types/types';

type MapStateToPropsType = {
	authData: AuthDataType,
	isAuthed: boolean,
	myProfileInfo: ProfileInfoType,
}

type MapDispatchToPropsType = {
	setAuthData: (data: AuthDataType, isAuthed: boolean) => void,
	setMyProfileInfo: (profileInfo: ProfileInfoType) => void,
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType;

class Headercontainer extends React.Component<PropsType> {
	render() {
		return (
			<Header 
				isAuthed={this.props.isAuthed} 
				login={this.props.authData.login}
				avatarUrl={this.props.myProfileInfo?.photos ?
							  this.props.myProfileInfo.photos.small : ''}
			/>
		);
	}
}



const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
	return {
		authData: state.auth.data,
		isAuthed: state.auth.isAuthed,
		myProfileInfo: state.profilePage.myProfileInfo ,
	}
}

const mapDispatchToProps = {
	setAuthData: authActions.setAuthDataAC,
	setMyProfileInfo: profileActions.setMyProfileInfo,
}
export default connect<MapStateToPropsType, MapDispatchToPropsType>(mapStateToProps, mapDispatchToProps)(Headercontainer);
