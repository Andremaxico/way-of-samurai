import React from 'react'
import classes from './Post.module.scss';

function Post(props) {
	return (
		<div className={classes.Post}>
			<div className={classes.avatar}>
				<img src={props.data.avatarUrl} />
			</div>
			<div className={classes.text}>
				<p>{props.data.text}</p>
				<p><b>Likes count: </b> {props.data.likesCount}</p>
			</div>	
		</div>
	)
}

export default Post;
