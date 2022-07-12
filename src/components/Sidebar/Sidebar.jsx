import React from 'react'
import NavigationContainer from './Navigation';
import classes from './Sidebar.module.scss'

function Sidebar(props) {
	return (
		<aside className={classes.sidebar}>
			<NavigationContainer />
		</aside>
	);
}

export default Sidebar;
