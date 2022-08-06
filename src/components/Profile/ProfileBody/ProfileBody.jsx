import React, { useState } from 'react';
import classes from './ProfileBody.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';
import defaultCover from '../../../assests/images/default-cover.png';
import ProfileStatus from './ProfileStatus';
import Preloader from '../../../UI/Preloader';

function ProfileBody({ logout, setAvatar, profileInfo, updateMyStatus }) {
	const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);

	const {fullName, userId: id, photos, aboutMe, isMyProfile} = profileInfo;
	const {small: coverImg, large: avatarImg} = photos;

	//AndreMaxico => Andre Maxico
	const name = fullName.split('').map(symbol => {
		return symbol.toUpperCase() === symbol ? ` ${symbol}` : symbol
	});


	const avatarFileChange = async (e) => {
		if(e.target.files.length > 0) {
			setIsAvatarUpdating(true);
			await setAvatar(e.target.files[0]);
			setIsAvatarUpdating(false);
		}
	}

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
				<div className={classes.description}>
					<p className={classes.login}>{name}</p>
					<ProfileStatus 
						updateMyStatus={updateMyStatus} 
						isMyProfile={isMyProfile} status={aboutMe}
					/>
				</div>
				{ isMyProfile && <button className={classes.logoutBtn} onClick={ logout }>Logout</button>}
			</div>
		</div>
	)
}

export default ProfileBody;
