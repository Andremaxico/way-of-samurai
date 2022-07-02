import React, { Component } from 'react'

function Sidenav(props) {
	return (
		<nav className='sidebar__nav'>
			<a>Profile</a>
			<a>Messsages</a>
			<a>News</a>
			<a>Music</a>
			<a>Settings</a>
		</nav>
	);
}

export default Sidenav;
