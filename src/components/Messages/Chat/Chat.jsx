import React from 'react'
import classes from './Chat.module.scss';
import { NavLink } from 'react-router-dom';

const Chat = (props) => {
  return (
	 <NavLink to='/' className={classes.chat}>
		 <div className={classes.userAvatar}>
			<img src={props.avatarUrl} alt="user that send a message avatar" />
		 </div>
		 <div className={classes.message}>
			<p className={classes.sendDate}></p>
			<p className={classes.text}></p>
		 </div>
	 </NavLink>
  )
}

export default Chat;
