import React from 'react';
import classes from './Preloader.module.scss';
import preloader from '../../assets/images/preloader.gif';

const Preloader = (props) => {
	return (
		<div className={classes.Preloader}>
			<img src={preloader} alt="Loading..." />
		</div>
	)
}

export default Preloader;