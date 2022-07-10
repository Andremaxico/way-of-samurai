import React from 'react'
import ProfileBody from './ProfileBody';
import MyPosts from './MyPosts';
import NewPost from './NewPost'
import classes from './Profile.module.scss'

export default function Profile(props) {
	return (
		<div className={classes.profile}>
			<ProfileBody info={props.data.profileInfo}/>
			<NewPost 
				newPostText={props.data.newPostText} 
				dispatch={props.dispatch}
			/>
			<MyPosts 
				postsData={props.data.postsData}
				avatarUrl={props.data.profileInfo.avatarUrl}
			/>
		</div>
	)
}
