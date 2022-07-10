import React from 'react';
import classes from './ProfileBody.module.scss';

function ProfileBody(props) {
	return (
		<div className={classes.profileBody}>
			<div className={classes.cover}>
				<img src={props.info.coverUrl} alt="Cover img" />
			</div>
			<div className={classes.info}>
				<div className={classes.avatar}>
					<img src={props.info.avatarUrl} alt="Loading avatar..." />
				</div>
				<div className={classes.description}>
					<p>{props.info.name}</p>
					<p>Age: {props.info.age}</p>
				</div>
			</div>
		</div>
	)
}

export default ProfileBody;
