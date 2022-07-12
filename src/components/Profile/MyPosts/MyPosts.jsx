import React from 'react';
import Post from './Post';
import classes from '../Profile.module.scss';

const MyPosts = (props) => {
	const postsList = props.postsData.map((data, index) => <Post avatarUrl={props.avatarUrl} data={data} key={index}/>);
	return (
		<div className={classes.myPosts}>
			{ postsList }
		</div>
	)
}

export default MyPosts;
