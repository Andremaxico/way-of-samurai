import React, { Component } from 'react'
import classes from  './Header.module.scss';
import { Link } from 'react-router-dom';
import Logo from '../../UI/Logo';

function Header(props) {
	return (
		<header className={classes.header}>
        <div className={classes.body}>
          <Logo />
          <div className={classes.account}>
            { props.isAuthed 
              ? <AccountInfo /> 
              : <Link to='/login'>Login</Link> }
          </div>
        </div>
      </header>
	);
}

export default Header;
