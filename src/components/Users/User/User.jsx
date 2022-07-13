import React from 'react';
import classes from './User.module.scss';

const User = (props) => {
	const {name: name, location: location, id: id, description: description, avatarUrl: avatarUrl, isFollowed: isFollowed} = props.info;
	const follow = () => {
		props.follow(id);
	};
	const unfollow = () => {
		props.unfollow(id);
	};
	return (
		<div className={classes.user}>
			<div className={classes.avatar}>
				<img src={avatarUrl} alt="user avatar" />
			</div>
			<div className={classes.info}>
				<div className={classes.title}>
					<h3 className={classes.name}>{name}</h3>
					<p className={classes.location}>
						<span className={classes.country}>{location.country}</span>
						<span className={classes.city}>{location.city}</span>
					</p>
				</div>
				<p className={classes.description}>{description}</p>
			</div>
			<button className={classes.followBtn}  onClick={isFollowed ? unfollow : follow }>{isFollowed ? 'Unfollow' : 'Follow'}</button>
		</div>
	)
}

export default User;
