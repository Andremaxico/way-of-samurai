import * as React from 'react';
import classes from './ProfileBody.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';
import defaultCover from '../../../assests/images/default-cover.png';
import Preloader from '../../../UI/Preloader';
import ProfileInfo from './ProfileInfo';
import ProfileInfoForm from './ProfileInfoForm';
import { ProfilePropsType } from '../Profile';
import { useDispatch, useSelector } from 'react-redux'
import FollowBtn from '../../../UI/FollowBtn';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { isFollowedType as IsFollowedType, ProfileInfoType } from '../../../types/types';
import { selectCurrentUserProfileInfo, selectFormError } from '../../../Redux/profile-selectors';
import { profileActions, setAvatar } from '../../../Redux/profile-reducer';
import { AnyArray } from 'immer/dist/internal';
import { AnyAction } from 'redux';
import { logout } from '../../../Redux/auth-reducer';

const ProfileBody: React.FC<ProfilePropsType> = ({followed, currUserProfileInfo: profileInfo}) => {
	//get data from state
	const formError = useSelector(selectFormError);
	
	//state callbacks
	const dispatch = useDispatch();
	const updateMyStatus = (value: string) => {
		dispatch(profileActions.setMyStatus(value));
	}
	const logoutFromProfile = () => {
		dispatch(logout() as unknown as AnyAction);
	}
	const setMyAvatar = (file: any) => {
		dispatch(setAvatar(file) as unknown as AnyAction);
	}
	const updateMyProfileData = (profileData: ProfileInfoType) => {
		dispatch(profileActions.setMyProfileInfo(profileData));
	}


	const navigate = useNavigate();
	const [isAvatarUpdating, setIsAvatarUpdating] = React.useState<boolean>(false);
	const [isEdit, setIsEdit] = React.useState<boolean>(false);
	const [isFollowed, setIsFollowed] = React.useState<IsFollowedType>(followed);
	
	const {userId: id, photos, isMyProfile } = profileInfo;
	const {small: coverImg, large: avatarImg} = photos || {};

	//isFollowed: true(false) -> isFollowed: false(true)
	const changeFollowingStatus = (value: boolean) => {
		setIsFollowed(value);
		navigate(`/profile/${id}/${value}`, {replace: true});
	}
	//change avatar
	const avatarFileChange = async (e: React.SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		if (!target.files) return;
		if(target.files.length > 0) {
			setIsAvatarUpdating(true);
			await setMyAvatar(target.files[0]);
			setIsAvatarUpdating(false);
		}
	}

	//isEdit
	const activateEdit = () => setIsEdit(true);
	const deactivateEdit = () => setIsEdit(false);

	if(isAvatarUpdating) return <Preloader />

	return (
		<div className={classes.profileBody}>
			<div className={classes.cover}>
				<img src={coverImg || defaultCover} alt="Cover img" />
			</div>
			<div className={classes.info}>
				<div className={`${classes.avatar} ${isMyProfile && classes.my}`}>
					<img src={avatarImg || defaultAvatar} alt="Loading avatar..." />
					{ isMyProfile && 
						<div className={classes.addFile}>
							<input type='file' id='getFile' onChange={ avatarFileChange }/> 
							<label htmlFor="getFile">Set avatar</label>
						</div>
					}
				</div>
				{isEdit ?
					<ProfileInfoForm 
						deactivateEdit={deactivateEdit} formError={formError}
						profileInfo={profileInfo}
						updateMyStatus={updateMyStatus} updateMyProfileData={updateMyProfileData}
					/>
				:	<ProfileInfo activateEdit={activateEdit} profileInfo={profileInfo} updateMyStatus={updateMyStatus}/>
				}
				{ isMyProfile && <button className={classes.logoutBtn} onClick={ logoutFromProfile }>Logout</button>}
				{ !isMyProfile && <FollowBtn isFollowed={isFollowed} userId={id}  setIsFollowed={changeFollowingStatus}/> }
			</div>
		</div>
	)
}

export default ProfileBody;
