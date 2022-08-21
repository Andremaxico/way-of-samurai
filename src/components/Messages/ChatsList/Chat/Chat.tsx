import * as React from 'react'
import classes from './Chat.module.scss';
import { NavLink } from 'react-router-dom';
import { UserInfoType } from '../../../../types/types';

type PropsType = {
	userInfo: UserInfoType,
}

const Chat: React.FC<PropsType> = ({userInfo}) => {
	return (
		<NavLink to={`/messages/${userInfo.id}`} className={`${classes.chat} ${classes._active}`}>
			<div className={classes.userAvatar}>
				<img src={userInfo.avatarUrl} alt="user that send a message avatar" />
			</div>
			<div className={classes.message}>
				<p className={classes.name}>{userInfo.name}</p>
				<p className={classes.text}>Hi, How are you?</p>
				<p className={classes.sendDate}>19.06.21</p>
			</div>
		</NavLink>
	)
}

export default Chat;
