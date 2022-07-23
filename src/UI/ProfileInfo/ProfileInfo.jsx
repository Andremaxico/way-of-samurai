import React from 'react';
import classes from './ProfileInfo.module.scss';
import defaultAvatar from '../../assets/images/default-avatar-img.png';

const ProfileInfo = (props) => {
	const {aboutMe, fullName, photos, userId} = props.info || {};
	const avatarUrl = photos ? photos.small : '';
	return (
		<div className={classes.Info}>
			<div className={classes.avatar}>
				<img src={avatarUrl || defaultAvatar} alt="Profile avatar" />		
			</div>
			<div className={classes.description}>
				<p>{fullName}</p>
				<p>{aboutMe}</p>
			</div>
		</div>
	)
}

export default ProfileInfo;
