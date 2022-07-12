import React from 'react';
import classes from './ProfileInfo.module.scss';

const ProfileInfo = (props) => {
	return (
		<div className={classes.Info}>
			<div className={classes.avatar}>
				<img src={props.info.avatarUrl} alt="Profile avatar" />		
			</div>
			<div className={classes.description}>
				<p>{props.info.name}</p>
				<p><b>Age:</b> {props.info.age}</p>
			</div>
		</div>
	)
}

export default ProfileInfo;
