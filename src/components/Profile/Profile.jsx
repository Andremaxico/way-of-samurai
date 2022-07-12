import React from 'react';
import MyPostsContainer from './MyPosts';
import NewPostContainer from './NewPost';
import ProfileBody from './ProfileBody';
import Post from './Post';
import classes from './Profile.module.scss';

export default function Profile() {
  return (
	<div className={classes.profile}>
		<ProfileBody />
		<NewPostContainer />
		<MyPostsContainer />
	</div>
  )
}
