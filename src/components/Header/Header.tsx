import * as React from 'react'
import classes from  './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import { useSelector } from 'react-redux';
import { selectAuthData, selectIsAuthed } from '../../Redux/auth-selectors';
import { selectMyProfileInfo } from '../../Redux/profile-selectors';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Col, Row } from 'antd';

const { Header } = Layout;

type PropsType = {};

const AppHeader: React.FC<PropsType> = (props) => {
  const { login } = useSelector(selectAuthData);
  const isAuthed = useSelector(selectIsAuthed);
  const myProfileInfo = useSelector(selectMyProfileInfo);
  const avatarUrl = myProfileInfo?.photos?.small || '';
  return (
    <Header className="header" style={{width: '100%', height: '100%', padding: '20px 50px'}}>
      <Row>
        <Col span={20}>
          <div className="logo" />
        </Col>
        <Col span={6}>  
          {isAuthed ?
            <AccountInfo avatarUrl={avatarUrl} login={login}/>
          : <Link to='/login'>Login</Link>
          }
        </Col>
      </Row>
      {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
    </Header>
    // <header className={classes.header}>
    //   <div className={classes.body}>
    //     <div className={classes.logo}>
    //       <img src='https://static.vecteezy.com/system/resources/previews/001/191/987/non_2x/circle-logo-png.png'/>
    //     </div>
    //     <div className={classes.login}>
    //       {
    //         isAuthed ? 
    //         <AccountInfo login={login} avatarUrl={avatarUrl}/> : 
    //         <NavLink to='/login' className={classes.loginLink }>
    //           Login
    //         </NavLink>
    //       }
    //     </div>
    //   </div>
    // </header>
  );
}

export default AppHeader;
