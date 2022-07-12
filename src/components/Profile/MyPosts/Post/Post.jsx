import React from 'react'
import classes from './Post.module.scss';

function Post (props) {
  return (
	 <div className={classes.post}>
		<div className={classes.avatar}>
			<img src={props.avatarUrl}/>
		</div>
		<div className={classes.text}>
			<p>{props.data.text}</p>
			<p>Likes count: {props.data.likes}</p>
		</div>	
	 </div>
  )
}

export default Post;
