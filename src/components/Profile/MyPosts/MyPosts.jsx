import React from 'react';
import Post from './Post/Post';
import classes from '../Profile.module.scss';

export const MyPosts = (props) => {
	return (
		<div className={classes.myPosts}>
			{
				props.postsData.map(data => <Post text={data.text} likes={data.likesCount}/>)
			}
		</div>
	)
}
