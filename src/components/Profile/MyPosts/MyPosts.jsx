import React from 'react';
import Post from '../Post';
import classes from '../Profile.module.scss';

const MyPosts = (props) => {
	const postsList = props.postsData.map(data => <Post key={data.id} data={data}/>);
	return (
		<div className={classes.MyPosts}>
			{postsList}
		</div>
	)
}

export default MyPosts;