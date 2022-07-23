import React from 'react';
import classes from './AccountInfo.module.scss';
import defaultAvatar from '../../../assets/images/default-avatar-img.png';
import { Link } from 'react-router-dom';

const AccountInfo = (props) => {
	return (
		<div className={classes.AccountInfo}>
			<Link to='/profile' className={classes.avatar}>
				<img src={props.avatarUrl || defaultAvatar} alt="Your avatar" />
			</Link>
			<p className={classes.nickname}>{props.login}</p>
		</div>
	)
}

export default AccountInfo;