import * as React from 'react';
import FriendsList from './FriendsList/FriendsList';
import classes from './Sidebar.module.scss';
import { LinkType, FriendCardType, UserCardType } from '../../types/types';
import { Sidenav } from './Sidenav/Sidenav';
import { SidebarStateType } from '../../Redux/sidebar-reducer';

type PropsType = {
	data: SidebarStateType,
}

const Sidebar: React.FC<PropsType> = ({data: {linksData, friendsData}}) => {
	return (
		<aside className={classes.sidebar}>
			<Sidenav linksData={linksData}/>
			<FriendsList friendsData={friendsData}/>
		</aside>
	);
}

export default Sidebar;
