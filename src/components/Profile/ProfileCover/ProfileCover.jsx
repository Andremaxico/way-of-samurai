import React from 'react'
import classes from '../Profile.module.scss';

export const ProfileCover = (props) => {
	return (
		<div className={classes.cover}>
			<img src={props.url} alt="Cover img" />
		</div>
	)
}
