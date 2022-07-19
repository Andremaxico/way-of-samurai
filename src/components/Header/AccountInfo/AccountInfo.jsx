import React from 'react';
import { Link } from 'react-router-dom';
import classes from './AccountInfo.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';

const AccountInfo = (props) => {
	return (
		<Link to='/profile' className={classes.AccountInfo}>
			<div className={classes.avatar}>
				<img src={props.avatarUrl || defaultAvatar} alt='your avatar' />
			</div>
			<p className={classes.login}>{props.login}</p>
		</Link>
	)
}

export default AccountInfo;