import React from 'react';
import classes from './User.module.scss';
import defaultAvatar from '../../assets/images/default-avatar-img.png';


const User = (props) => {
	const {name, photos, status, followed: isFollowed} = props.info;
	const avatarImg = photos.small;
	const follow = () => props.follow();
	const unfollow = () => props.unfollow();

	return (
		<div className={classes.User}>
			<div className={classes.avatar}>
				<img src={avatarImg || defaultAvatar} alt="Avatar img" />
			</div>
			<div className={classes.info}>
				<p className={classes.name}>{name}</p>
				<p className={classes.description}>{status}</p>
			</div>
			<button className={classes.followBtn} onClick={ isFollowed ? unfollow : follow }>{isFollowed ? 'Unfollow': 'Follow'}</button>
		</div>
	)
}

export default User;
