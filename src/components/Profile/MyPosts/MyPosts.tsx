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
	const postsList = postsData.map((data: PostDataType) => {
		return <Post avatarUrl={avatarUrl || defaultAvatar} data={data} key={data.id}/>;
	});
	return (
		<div className={classes.myPosts}>
			{ postsList }
		</div>
	)
}

export default MyPosts;
