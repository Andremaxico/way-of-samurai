import React from 'react';
import Post from './Post';
import classes from '../Profile.module.scss';

const MyPosts = (props) => {
	return (
		<div className={classes.myPosts}>
			{
				props.postsData.map((data, index) => <Post avatarUrl={props.avatarUrl} text={data.text} key={index} likes={data.likesCount}/>)
			}
		</div>
	)
}

export default MyPosts;
