import React, { Component } from 'react'
import classes from  './Header.module.scss';
import { Link } from 'react-router-dom';
import Logo from '../../UI/Logo';
import AccountInfo from './AccountInfo';
import { connect } from 'react-redux';

function Header(props) {
	return (
		<header className={classes.header}>
        <div className={classes.body}>
          <Logo />
          <div className={classes.account}>
            { props.isAuthed 
              ? <AccountInfo /> 
              : <Link to='/login' className={classes.loginLink}>Login</Link> }
          </div>
        </div>
      </header>
	);
}

const mapStateToProps = (state) => {
  return {
    isAuthed: state.auth.isAuthed,
  }
}

export default connect(mapStateToProps)(Header);
