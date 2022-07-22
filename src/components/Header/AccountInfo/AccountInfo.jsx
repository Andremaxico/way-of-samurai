import React from 'react';
import classes from './AccountInfo.module.scss';
import defaultAvatar from '../../../assets/images/default-avatar-img.png';

const AccountInfo = (props) => {
	return (
		<div className={classes.AccountInfo}>
			<div className={classes.avatar}>
				<img src={props.avatarUrl || defaultAvatar} alt="Your avatar" />
			</div>
			<p className={classes.nickname}>{props.name}</p>
		</div>
	)
}

export default AccountInfo;