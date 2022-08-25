import * as React from 'react';
import Post from './Post';
import classes from '../Profile.module.scss';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';
import { PostDataType } from '../../../types/types';

type PropsType = {
	postsData: Array<PostDataType>,
	avatarUrl: string,
}

const MyPosts: React.FC<PropsType> = ({postsData, avatarUrl}) => {
	let postsList;
	if(postsData.length > 0) {
		postsList = postsData.map((data: PostDataType) => {
			console.log(data);
			return <Post avatarUrl={avatarUrl || defaultAvatar} data={data} key={data.id}/>;
		});
	} else {
		postsList = '';
	}
	return (
		<div className={classes.myPosts}>
			{ postsList }
		</div>
	)
}

export default MyPosts;
