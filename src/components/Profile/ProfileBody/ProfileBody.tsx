import * as React from 'react';
import classes from './ProfileBody.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';
import defaultCover from '../../../assests/images/default-cover.png';
import Preloader from '../../../UI/Preloader';
import ProfileInfo from './ProfileInfo';
import ProfileInfoForm from './ProfileInfoForm';
import { ProfilePropsType } from '../Profile';
import FollowBtn from '../../../UI/FollowBtn';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const ProfileBody: React.FC<ProfilePropsType> = ({ 
	logout, setAvatar, currUserProfileInfo: profileInfo, updateMyStatus, 
	formError, updateMyProfileData, followed
}) => {
	const navigate = useNavigate();
	const [isAvatarUpdating, setIsAvatarUpdating] = React.useState<boolean>(false);
	const [isEdit, setIsEdit] = React.useState<boolean>(false);
	const [isFollowed, setIsFollowed] = React.useState<'true' | 'false' | boolean>(followed);
	
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
			await setAvatar(target.files[0]);
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
				{ isMyProfile && <button className={classes.logoutBtn} onClick={ logout }>Logout</button>}
				{ !isMyProfile && <FollowBtn isFollowed={isFollowed} userId={id}  setIsFollowed={changeFollowingStatus}/> }
			</div>
		</div>
	)
}

export default ProfileBody;
