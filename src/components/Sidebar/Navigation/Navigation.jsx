import React from 'react';
import Link from '../../../UI/Link/Link';
import classes from '../Sidebar.module.scss';

const Navigation = (props) => {
	const links = props.linksData.map(data => <Link path={data.path} key={data.id} text={data.text}/>)
	return (
		<nav className={classes.nav}>
			{ links }
		</nav>
	)
}

export default Navigation;
