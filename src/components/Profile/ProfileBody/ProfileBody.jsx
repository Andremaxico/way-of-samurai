import React from 'react'
import classes from '../Profile.module.scss';


export const Info = (props) => {
  return (
	<div className={classes.Info}>
		<div className={classes.cover}>
			<img src='https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg'/>
		</div>
		<div className={classes.info}>
			<div className={classes.avatar}>
					
			</div>
		</div>
	</div>
  )
}

export default Info;