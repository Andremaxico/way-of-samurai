import React from 'react'
import NewPost from './NewPost/NewPost'
import Post from './Post/Post'
import classes from './Profile.module.scss'

export default function Profile() {
  return (
	<div className={classes.profile}>
		<div className={classes.cover}>
			<img src='https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg'/>
		</div>
		<div className={classes.info}>
			<div className={classes.avatar}>

			</div>
		</div>
		<NewPost />
		<Post text="My first post"/>
		<Post text="My second post(Want to made own s. n.)"/>
	</div>
  )
}
