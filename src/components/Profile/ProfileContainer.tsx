import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Profile from './Profile';
import Preloader from '../../UI/Preloader';
//reducers
import { usersActions } from '../../Redux/users-reducer';
import { setUserById, updateMyStatus, setAvatar, updateMyProfileData } from '../../Redux/profile-reducer';
import { logout } from '../../Redux/auth-reducer';
//selectors
import { selectIsAuthed } from '../../Redux/auth-selectors';
//hocs
import withRouter from '../../hocs/withRouter';
import { AnyAction, compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import withNetworkRedirect from '../../hocs/withNetworkRedirect';
import { RootStateType } from '../../Redux/redux-store';
import { FriendCardType, ProfileInfoType, RouterPropsType, UserCardType } from '../../types/types';
import { selectIsFetching } from '../../Redux/users-selectors';
import { selectCurrentUserProfileInfo, selectMyProfileInfo } from '../../Redux/profile-selectors';




type PropsType = RouterPropsType;

const ProfileContainer: React.FC<PropsType> = (props) => {
	const [userId, setUserId] = React.useState<number | null>(null);

	const isAuthed = useSelector(selectIsAuthed);
	const isFetching = useSelector(selectIsFetching);
	const currUserProfileInfo = useSelector(selectCurrentUserProfileInfo);
	const myProfileInfo = useSelector(selectMyProfileInfo);

	const dispatch = useDispatch();
	const setProfileByUserId = (userId: number) => {
		dispatch(setUserById(userId) as unknown as AnyAction);
	} 
	const toggleIsFetching = (value: boolean) => {
		dispatch(usersActions.toggleIsFetchingAC(value));
	}

	//if we render other user profile, we set const userId
	React.useEffect(() => {
		if(props.router.params.userId) {
			//set local state for show user profile
			setUserId(props.router.params.userId);
		} else {
			//set local state to null to show my profile
			setUserId(null);
		}

	}, [props.router.params.userId]);

	//set currUserProfileInfo in state if we got userId
	React.useEffect(() => {
		const setUser = async (userId: number) => {
			await setProfileByUserId(userId)
			toggleIsFetching(false);
		}
		//if we get other user id, we set this with thunk
		if(userId) {
			setUser(userId);
		}
	}, [userId]);

	if (!isAuthed && !props.router.params.userId) return <Navigate to='/login' replace />

	if(isFetching) {
		return <Preloader />
	}
	return (
		<Profile currUserProfileInfo={ userId
				? currUserProfileInfo
				: myProfileInfo
				} followed={props.router.params.isFollowed}
		/>
	)
}




export default compose(
	withNetworkRedirect,
	withRouter,
)(ProfileContainer);
