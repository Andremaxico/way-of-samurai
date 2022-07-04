import React from 'react';
import classes from './Sidebar.module.scss';
import { NavLink } from "react-router-dom";

function Sidebar(props) {
	return (
		<aside className={classes.sidebar}>
			<nav className={classes.nav}>
				<NavLink 
					to='/profile' 
					className={({isActive}) =>
						isActive ? classes._active : undefined
					}
					>
					Profile
				</NavLink>
				<NavLink 
					to='messages'
					className={({isActive}) =>
						isActive ? classes._active : undefined
					}
					>
					Messages
				</NavLink>
				<NavLink 
					to='news'
					className={({isActive}) =>
						isActive ? classes._active : undefined
					}
					>
					News
				</NavLink>
				<NavLink 
					to='music'
					className={({isActive}) =>
						isActive ? classes._active : undefined
					}
					>
					Music
				</NavLink>
				<NavLink 
					to='settings'
					className={({isActive}) =>
						isActive ? classes._active : undefined
					}
					>
					Settings
				</NavLink>
			</nav>
		</aside>
	);
}

export default Sidebar;
