import React from 'react';
import classes from '../Sidebar.module.scss';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  return (
	<nav className={classes.nav}>
		<NavLink to='/profile'>Profile</NavLink>
		<NavLink to='/messages' >Messsages</NavLink>
		<a>News</a>
		<a>Music</a>
		<a>Settings</a>
	</nav>
  )
}

export default Navigation;
