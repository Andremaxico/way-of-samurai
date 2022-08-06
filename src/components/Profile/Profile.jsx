import React from 'react'
import ProfileBody from './ProfileBody';
import MyPosts from './MyPosts';
import NewPost from './NewPost'
import classes from './Profile.module.scss'
import Preloader from '../../UI/Preloader';

const Profile = (props) => {
	if(!props.currUserProfileInfo) {
		return <Preloader />
	}

	return (
		<div className={classes.profile}>
			<ProfileBody 
				profileInfo={props.currUserProfileInfo}  setAvatar={props.setAvatar}
				updateMyStatus={props.updateMyStatus} logout={props.logout}
			/>
			<h2 className={classes.title}>My posts</h2>
			<NewPost />
			<MyPosts />
		</div>
	)
}

export default Profile;
