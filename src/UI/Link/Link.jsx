import React from 'react';
import classes from './Link.module.scss';
import { NavLink } from 'react-router-dom';

const Link = (props) => {
	return (
		<NavLink 
			to={props.path} 
			className={({isActive}) => isActive ? `${classes._active} ${classes.navLink}` : classes.navLink}
		>
		{props.text}
		</NavLink>
	)
}

export default Link;