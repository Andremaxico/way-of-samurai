import React from 'react';
import withNetworkRedirect from '../../hocs/withNetworkRedirect';
import classes from './Login.module.scss';
import LoginForm from './LoginForm';

const Login = (props) => {
	return (
		<div className={classes.Login}>
			<h1 className={classes.title}>Login</h1>
			<LoginForm />
		</div>
	)
}

export default withNetworkRedirect(Login);
