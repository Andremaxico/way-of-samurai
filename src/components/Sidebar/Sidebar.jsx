import React, { Component } from 'react'
import Navigation from './Navigation/Navigation';
import classes from './Sidebar.module.scss'

function Sidebar(props) {
	return (
		<aside className={classes.sidebar}>
			<Navigation />
		</aside>
	);
}

export default Sidebar;
