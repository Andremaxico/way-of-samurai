import React from 'react';
import Preloader from '../../../UI/Preloader/Preloader';
import classes from './ProfileBody.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';
import defaultCover from '../../../assests/images/default-cover.png';
import ProfileStatus from './ProfileStatus';

function ProfileBody(props) {
	if(Object.keys(props.profileInfo) < 1) {
		return <Preloader />
	}

	const logout = () => props.logout();

	const {fullName, userId: id, photos, aboutMe, } = props.profileInfo;
	const {small: coverImg, large: avatarImg} = photos;

	//AndreMaxico => Andre Maxico
	const name = fullName.split('').map(symbol => {
		return symbol.toUpperCase() === symbol ? ` ${symbol}` : symbol
	});

	return (
		<div className={classes.profileBody}>
			<div className={classes.cover}>
				<img src={coverImg || defaultCover} alt="Cover img" />
			</div>
			<div className={classes.info}>
				<div className={classes.avatar}>
					<img src={avatarImg || defaultAvatar} alt="Loading avatar..." />
				</div>
				<div className={classes.description}>
					<p className={classes.login}>{name}</p>
					<ProfileStatus updateMyStatus={props.updateMyStatus} status={aboutMe}/>
				</div>
				{ props.myProfile && <button className={classes.logoutBtn} onClick={ logout }>Logout</button>}
			</div>
		</div>
	)
}

export default ProfileBody;
