import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Profile from './Profile';
import Preloader from '../../UI/Preloader';
//reducers
import { usersActions } from '../../Redux/users-reducer';
import { setUserById, updateMyStatus, setAvatar, updateMyProfileData } from '../../Redux/profile-reducer';
import { logout } from '../../Redux/auth-reducer';
//selectors
import { getIsAuthed } from '../../Redux/auth-selectors';
//hocs
import withRouter from '../../hocs/withRouter';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withNetworkRedirect from '../../hocs/withNetworkRedirect';
import { RootStateType } from '../../Redux/redux-store';
import { ProfileInfoType, RouterPropsType } from '../../types/types';


type MapDispatchPropsType = {
	toggleIsFetching: (value: boolean) => void,
	setUserById: any,
	updateMyStatus: (status: string) => void,
	logout: () => void,
	setAvatar: (file: any) => void,
	updateMyProfileData: (profilaData: ProfileInfoType) => void,
}
type MapStatePropsType = {
	currUserProfileInfo: ProfileInfoType,
	myProfileInfo: ProfileInfoType,
	myProfileId: number | null,
	isFetching: boolean,
	formError: string | null,
	captchaUrl: string | null,
	isAuthed: boolean | null,
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouterPropsType;

const ProfileContainer: React.FC<PropsType> = (props: PropsType) => {
	const [userId, setUserId] = React.useState<number | null>(null);
	
	//if we render other user profile, we set const userId
	React.useEffect(() => {
		if(props.router.params.userId) {
			//set const for show user profile
			setUserId(props.router.params.userId);
		} else {
			//set const to null to show my profile
			setUserId(null);
		}

	}, [props.router.params.userId]);

	//set currUserProfileInfo in state if we got userId
	React.useEffect(() => {
		//if we get other user id, we set this with thunk
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
				updateMyStatus={props.updateMyStatus} logout={props.logout}
				formError={props.formError}
				setAvatar={props.setAvatar} updateMyProfileData={props.updateMyProfileData}
		/>
	)
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
	return {
		currUserProfileInfo: state.profilePage.currUserProfileInfo,
		myProfileInfo: state.profilePage.myProfileInfo,
		myProfileId: state.auth.data.id,
		isFetching: state.usersPage.isFetching,
		formError: state.profilePage.myProfileFormError,
		captchaUrl: state.auth.captchaUrl,
		isAuthed: getIsAuthed(state),
	}
}
const mapDispatchToProps: MapDispatchPropsType = {
	toggleIsFetching: usersActions.toggleIsFetchingAC,
	setUserById,
	updateMyStatus,
	logout,
	setAvatar,
	updateMyProfileData,
}

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType>(mapStateToProps, mapDispatchToProps),
	withNetworkRedirect,
	withRouter,
)(ProfileContainer);
