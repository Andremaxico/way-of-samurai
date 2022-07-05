import React from 'react'
import classes from './Chat.module.scss';
import { NavLink } from 'react-router-dom';

const Chat = (props) => {
  return (
	 <NavLink to={`/messages/${props.id}`} className={classes.chat}>
		 <div className={classes.userAvatar}>
			<img src={props.userInfo.avatarUrl} alt="user that send a message avatar" />
		 </div>
		 <div className={classes.message}>
			<p className={classes.name}>{props.userInfo.name}</p>
			<p className={classes.text}>Hi, How are you?</p>
			<p className={classes.sendDate}>19.06.21</p>
		 </div>
	 </NavLink>
  )
}

export default Chat;
