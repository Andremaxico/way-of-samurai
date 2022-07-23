import React from 'react';
import MyPostsContainer from './MyPosts';
import NewPostContainer from './NewPost';
import ProfileBody from './ProfileBody';
import classes from './Profile.module.scss';

function Profile(props) {
	return (
		<div className={classes.profile}>
			<ProfileBody profileData={props.profileData}/>
			<NewPostContainer />
			<MyPostsContainer />
		</div>
	)
}

export default Profile;
