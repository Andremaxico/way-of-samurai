import React from 'react';
import classes from './User.module.scss';
import defaultAvatar from '../../assets/images/default-avatar-img.png';


const User = (props) => {
	const {name, photos, status, followed: isFollowed, id} = props.info;
	const avatarImg = photos.small;

	const followingInProgress = props.followingInProgress.includes(id);

	console.log(followingInProgress, props.followingInProgress);

	const follow = (event) => props.follow(id);
	const unfollow = (event) => props.unfollow(id);

	return (
		<div className={classes.User}>
			<div className={classes.avatar}>
				<img src={avatarImg || defaultAvatar} alt="Avatar img" />
			</div>
			<div className={classes.info}>
				<p className={classes.name}>{name}</p>
				<p className={classes.description}>{status}</p>
			</div>
			<button className={classes.followBtn} 
					  onClick={ followingInProgress ? null : isFollowed ? unfollow : follow }
			>{ followingInProgress ? 'Processing...' : isFollowed ? 'Unfollow': 'Follow' }</button>
		</div>
	)
}

export default User;
