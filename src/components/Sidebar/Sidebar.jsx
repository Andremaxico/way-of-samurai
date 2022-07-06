import React from 'react';
import { FriendsList } from './FriendsList/FriendsList';
import classes from './Sidebar.module.scss';
import { Sidenav } from './Sidenav/Sidenav';

function Sidebar(props) {
	return (
		<aside className={classes.sidebar}>
			<Sidenav linksData={props.data.linksData}/>
			<FriendsList friendsData={props.data.friendsData}/>
		</aside>
	);
}

export default Sidebar;
