import * as React from 'react'
import { PostDataType } from '../../../../types/types';
import classes from './Post.module.scss';

type PropsType = {
	data: PostDataType,
	avatarUrl: string,
}

const Post: React.FC<PropsType> = ({data, avatarUrl}) => {
  return (
	 <div className={classes.post}>
		<div className={classes.avatar}>
			<img src={avatarUrl}/>
		</div>
		<div className={classes.text}>
			<p>{data.text}</p>
			<p>Likes count: {data.likesCount}</p>
		</div>	
	 </div>
  )
}

export default Post;
