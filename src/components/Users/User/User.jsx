import React from 'react';
import classes from './User.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';
import { Link } from 'react-router-dom';
import { usersAPI } from '../../../api/api';
import { toggleFollowingInProgress } from '../../../Redux/users-reducer';

const User = (props) => {
	const {name: name, id: id, status: description, photos: photos, followed: isFollowed} = props.info;
	const follow = () => {
		debugger;
		usersAPI.follow(id).then(res => {
			if(res.resultCode === 0) {
				props.follow(id) ;
			}
		})
	};
	const unfollow = () => {
		toggleFollowingInProgress(true);
		debugger;
		usersAPI.unfollow(id).then(res => {
			if(res.resultCode === 0) {
				props.unfollow(id);
				toggleFollowingInProgress(false);
			}
		})
	};
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
			<button className={classes.followBtn} disabled={props.followingInProgress} onClick={isFollowed ? unfollow : follow }>{isFollowed ? 'Unfollow' : 'Follow'}</button>
		</div>
	)
}

export default User;
