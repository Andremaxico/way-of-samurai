import React from 'react'
import Info from './Info/Info';
import { MyPosts } from './MyPosts/MyPosts';
import NewPost from './NewPost/NewPost'
import classes from './Profile.module.scss'
import { ProfileCover } from './ProfileCover/ProfileCover';

export default function Profile(props) {
	let url = 'https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg';
	return (
		<div className={classes.profile}>
			<ProfileCover url={url}/>
			<Info />
			<NewPost />
			<MyPosts postsData={props.data}/>
		</div>
	)
}
