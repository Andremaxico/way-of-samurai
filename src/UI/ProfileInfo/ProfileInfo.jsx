import React from 'react';
import classes from './ProfileInfo.module.scss';

const ProfileInfo = (props) => {
	const {age: age, name: name, avatarUrl: avatarUrl } = props.info;
	return (
		<div className={classes.Info}>
			<div className={classes.avatar}>
				<img src={avatarUrl} alt="Profile avatar" />		
			</div>
			<div className={classes.description}>
				<p>{name}</p>
				<p>{age} {age[age.length-1] != '1' ? 'years': 'year'}</p>
			</div>
		</div>
	)
}

export default ProfileInfo;
