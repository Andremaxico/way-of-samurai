import * as React from 'react';
import { FriendsList } from './FriendsList/FriendsList';
import classes from './Sidebar.module.scss';
import { LinkType, FriendCardType } from '../../types/types';
import { Sidenav } from './Sidenav/Sidenav';

type PropsType = {
	data: {
		linksData: Array<LinkType>,
		friendsData: Array<FriendCardType>
	}
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
