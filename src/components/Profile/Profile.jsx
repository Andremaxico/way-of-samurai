import React from 'react'
import ProfileBody from './ProfileBody';
import MyPosts from './MyPosts';
import NewPost from './NewPost'
import classes from './Profile.module.scss'

const Profile = (props) => {
	return (
		<div className={classes.profile}>
			<ProfileBody profileInfo={props.currUserProfileInfo} updateMyStatus={props.updateMyStatus}/>
			<NewPost />
			<MyPosts />
		</div>
	)
}

export default Profile;
