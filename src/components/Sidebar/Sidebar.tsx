import * as React from 'react';
import FriendsList from './FriendsList/FriendsList';
import { Sidenav } from './Sidenav/Sidenav';
import { Layout } from 'antd';

const { Sider } = Layout;

type PropsType = {}

const Sidebar: React.FC<PropsType> = (props) => {
	return (
		<Sider style={{padding: '20px'}} className="site-layout-background">
			<Sidenav />
			<FriendsList />
		</Sider>
	);
}

export default Sidebar;
