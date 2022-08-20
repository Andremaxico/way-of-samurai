import * as React from 'react';
import classes from './User.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';
import { Link } from 'react-router-dom';
import { UserCardType } from '../../../types/types';

type PropsType = {
	info: UserCardType,
	followingInProgress: Array<number>,
	follow: (id: number) => void,
	unfollow: (id: number) => void,
}

const User: React.FC<PropsType> = (props: PropsType) => {
	const {name: name, id: id, status: description, photos: photos, followed: isFollowed} = props.info;
	const followingInProgress = props.followingInProgress.includes(id);
	
	const follow = () => props.follow(id);
	const unfollow = () => props.unfollow(id);

	return (
		<div className={classes.user}>
			<Link to={`/profile/${id}`} className={classes.avatar}>
				<img src={photos.small || defaultAvatar} alt="user avatar" />
			</Link>
			<div className={classes.info}>
				<div className={classes.title}>
					<h3 className={classes.name}>{name}</h3>
					<p className={classes.location}>
						<span className={classes.country}>{'location.country'}</span>
						<span className={classes.city}>{'location.city'}</span>
					</p>
				</div>
				<p className={classes.description}>{description}</p>
			</div>
			<button 
				className={classes.followBtn} 
				onClick={!followingInProgress ? (isFollowed ? unfollow : follow) : undefined }
			>{followingInProgress ? 'Processing...' :  isFollowed ? 'Unfollow' : 'Follow'}</button>
		</div>
	)
}

export default User;
