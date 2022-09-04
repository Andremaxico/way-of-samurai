import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { selectLinksData } from '../../../Redux/sidebar-selectors';
import { LinkType } from '../../../types/types';
import classes from '../Sidebar.module.scss';

import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

type PropsType = {};


type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  theme?: 'light' | 'dark',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    theme,
  } as MenuItem;
}

export const Sidenav: React.FC<PropsType> = (props) => {
	const linksData = useSelector(selectLinksData);

	//location
	const location = useLocation();

	//app navigation items
	const navItems: Array<MenuItem> = linksData.map((data: LinkType, i) => {
	return getItem(
		<Link to={data.path} >
			{data.text}
			</Link>,
		data.path,
	)
	});

	console.log('location', location);

	const currPage = '/' + location.pathname.split('/')[1];


  return (
	<nav className={classes.nav}>
		<Menu
			mode="inline" theme='dark'
			defaultSelectedKeys={[currPage]}
			style={{ height: '100%', borderRight: 0 }}
			items={navItems}
		/>
	</nav>
  )
}
