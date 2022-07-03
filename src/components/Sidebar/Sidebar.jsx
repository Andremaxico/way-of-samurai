import React, { Component } from 'react'
import classes from './Sidebar.module.scss'

function Sidebar(props) {
	return (
		<aside className={classes.sidebar}>
			<nav className={classes.nav}>
				<a className={classes._active}>Profile</a>
				<a>Messages</a>
				<a>News</a>
				<a>Music</a>
				<a>Settings</a>
			</nav>
		</aside>
	);
}

export default Sidebar;
