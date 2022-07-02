import React, { Component } from 'react'
import classes from  './Header.module.scss';

function Header(props) {
	return (
		<header className={classes.header}>
        <div className={classes.body}>
          <div className={classes.logo}>
          	<img src='https://static.vecteezy.com/system/resources/previews/001/191/987/non_2x/circle-logo-png.png'/>
          </div>
        </div>
      </header>
	);
}

export default Header;
