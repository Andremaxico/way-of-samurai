import React from 'react';
import classes from './NetworkError.module.scss';

const NetworkError = (props) => {
	return (
		<div className={classes.NetworkError}>
			<p className={classes.message}>Plase Check your network connection and try again</p>
		</div>
	)
}

export default NetworkError;
