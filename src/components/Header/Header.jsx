import React from 'react'
import classes from  './Header.module.scss';
import { NavLink } from 'react-router-dom';
import AccountInfo from './AccountInfo';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.body}>
        <div className={classes.logo}>
          <img src='https://static.vecteezy.com/system/resources/previews/001/191/987/non_2x/circle-logo-png.png'/>
        </div>
        <div className={classes.login}>
          {
            props.isAuthed ? 
            <AccountInfo login={props.login} avatarUrl={props.avatarUrl}/> : 
            <NavLink to='/profile' className={classes.loginLink }>
              Login
            </NavLink>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
