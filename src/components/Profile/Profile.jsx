import React from 'react'
import ProfileBody from './ProfileBody';
import MyPosts from './MyPosts';
import NewPost from './NewPost'
import classes from './Profile.module.scss'

const Profile = (props) => {
	return (
		<div className={classes.profile}>
			<ProfileBody 
				profileInfo={props.currUserProfileInfo} 
				updateMyStatus={props.updateMyStatus} logout={props.logout}
				myProfile
			/>
			<h2 className={classes.title}>My posts</h2>
			<NewPost />
			<MyPosts />
		</div>
	)
}

export default Profile;
