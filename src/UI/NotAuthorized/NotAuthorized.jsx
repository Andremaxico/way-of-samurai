import React from 'react';
import classes from './NotAuthorized.module.scss';
import { Link } from 'react-router-dom';

const NotAuthorized = (props) => {
	return (
		<div className={classes.NotAuthorized}>
			<p className={classes.message}>You are not authorized</p>
			<Link to='/login' className={classes.loginBtn}>Login</Link>
		</div>
	)
}

export default NotAuthorized;
