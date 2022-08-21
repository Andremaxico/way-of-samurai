import * as React from 'react';
import preloader from '../../assests/images/preloader.gif';
import classes from './Preloader.module.scss';

type PropsType = {};

const Preloader: React.FC<PropsType> = (props) => {
	return (
		<div className={classes.loadingImg}>
			<img src={preloader} alt="Loading..." />
		</div>
	)
}

export default Preloader;
