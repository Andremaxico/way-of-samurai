import * as React from 'react';
import { Link } from 'react-router-dom';
import classes from './AccountInfo.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';

type PropsType = {
	login: string | null,
	avatarUrl: string,
}

const AccountInfo: React.FC<PropsType> = (props) => {
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