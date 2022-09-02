import * as React from 'react'
import classes from  './Header.module.scss';
import { NavLink } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import { useSelector } from 'react-redux';
import { selectAuthData, selectIsAuthed } from '../../Redux/auth-selectors';
import { selectMyProfileInfo } from '../../Redux/profile-selectors';

type PropsType = {};

const Header: React.FC<PropsType> = (props) => {
  const { login } = useSelector(selectAuthData);
  const isAuthed = useSelector(selectIsAuthed);
  const myProfileInfo = useSelector(selectMyProfileInfo);
  const avatarUrl = myProfileInfo?.photos?.small || '';
  return (
    <header className={classes.header}>
      <div className={classes.body}>
        <div className={classes.logo}>
          <img src='https://static.vecteezy.com/system/resources/previews/001/191/987/non_2x/circle-logo-png.png'/>
        </div>
        <div className={classes.login}>
          {
            isAuthed ? 
            <AccountInfo login={login} avatarUrl={avatarUrl}/> : 
            <NavLink to='/login' className={classes.loginLink }>
              Login
            </NavLink>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
