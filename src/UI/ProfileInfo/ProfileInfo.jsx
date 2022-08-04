import React from 'react';
import classes from './ProfileInfo.module.scss';
import defaultAvatar from '../../assets/images/default-avatar-img.png';
import ProfileStatus from './ProfileStatus';
import { connect } from 'react-redux';
import { setMyStatus } from '../../Redux/profileReducer';
import { logout } from '../../Redux/authReducer';

const ProfileInfo = (props) => {
	const {aboutMe, fullName, photos, isMyProfile} = props.info || {};
	const avatarUrl = photos?.small;

	return (
		<div className={classes.Info}>
			<div className={classes.avatar}>
				<img src={avatarUrl || defaultAvatar} alt="Profile avatar" />		
			</div>
			<div className={classes.description}>
				<p className={classes.login}>{fullName}</p>
				<ProfileStatus status={aboutMe} isMyProfile={isMyProfile} setMyStatus={props.setMyStatus}/>
			</div>
			{isMyProfile &&
				<button onClick={props.logout} className={classes.logoutBtn}>Logout</button>
			}
		</div>
	)
}

export default connect(null, { setMyStatus, logout })(ProfileInfo);
