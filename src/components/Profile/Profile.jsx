import React from 'react';
import MyPostsContainer from './MyPosts';
import NewPostContainer from './NewPost';
import ProfileBodyContainer from './ProfileBody';
import classes from './Profile.module.scss';

export default function Profile() {
  return (
	<div className={classes.profile}>
		<ProfileBodyContainer />
		<NewPostContainer />
		<MyPostsContainer />
	</div>
  )
}
