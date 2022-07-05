import React from 'react'
import Info from './Info/Info';
import NewPost from './NewPost/NewPost'
import Post from './Post/Post'
import classes from './Profile.module.scss'

export default function Profile() {
	console.log(classes);
  return (
	<div className={classes.profile}>
		<div className={classes.cover}>
			<img src='https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg'/>
		</div>
		<Info />
		<NewPost />
		<div className={classes.myPosts}>
			<Post text="My first post" likes="3"/>
			<Post text="My second post(Want to made own s. n.)" likes='1'/>
		</div>
	</div>
  )
}
