import React from 'react';
import Preloader from '../../../UI/Preloader/Preloader';
import classes from './ProfileBody.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';
import defaultCover from '../../../assests/images/default-cover.png';

function ProfileBody(props) {
	if(Object.keys(props.info) < 1) {
		return <Preloader />
	}
	const {fullName, userId: id, photos, aboutMe: about, } = props.info;
	const {small: coverImg, large: avatarImg} = photos;
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
					<p>{name}</p>
					<p>{about}</p>
				</div>
			</div>
		</div>
	)
}

export default ProfileBody;
