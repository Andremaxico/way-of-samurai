import * as React from 'react';
import classes from './User.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';
import { Link } from 'react-router-dom';
import { UserCardType } from '../../../types/types';
import FollowBtn from '../../../UI/FollowBtn';

type PropsType = {
	info: UserCardType,
}

const User: React.FC<PropsType> = React.memo((props) => {
	const {name, id, status: description, photos: photos, followed: isFollowed} = props.info;

	return (
		<div className={classes.user}>
			<Link to={`/profile/${id}/${isFollowed}`} className={classes.avatar}>
				<img src={photos?.small || defaultAvatar} alt="user avatar" />
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
			<FollowBtn isFollowed={isFollowed} userId={id} />
		</div>
	)
});

export default User;
