import React from 'react'
import { FriendLink } from './FriendLink/FriendLink';
import classes from './FriendsList.module.scss';


export const FriendsList = (props) => {
	return (
		<div className={classes.friends}>
			<h2 className={classes.title}>Friends</h2>
			<div className={classes.grid}>
				{/* Render friends about data */}
				{
					props.friendsData.map(data => {
						return <FriendLink friendInfo={data} key={data.id}/>
					})
				}
			</div>
		</div>
	)
}
