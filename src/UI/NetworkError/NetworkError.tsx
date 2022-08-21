import * as React from 'react';
import classes from './NetworkError.module.scss';

type PropsType = {};

const NetworkError: React.FC<PropsType> = (props) => {
	return (
		<div className={classes.NetworkError}>
			<p className={classes.errorText}>Please check your internet connection and try again</p>
		</div>
	)
}

export default NetworkError;
