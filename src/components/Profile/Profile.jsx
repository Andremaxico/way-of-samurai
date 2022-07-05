import React from 'react'
import Info from './Info/Info';
import NewPost from './NewPost/NewPost'
import Post from './Post/Post'
import classes from './Profile.module.scss'

export default function Profile() {
	const postsData = [
		{
			text: 'Hi',
			likesCount: 0,
		},
		{
			text: 'How are you?',
			likesCount: 0,
		},
		{
			text: 'Where are you?',
			likesCount: 5,
		},
		{
			text: 'Want to home?...',
			likesCount: 8,
		},
		{
			text: 'Me too...:(',
			likesCount: 6,
		},
	]
	return (
		<div className={classes.profile}>
			<div className={classes.cover}>
				<img src='https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg'/>
			</div>
			<Info />
			<NewPost />
			<div className={classes.myPosts}>
				{
					postsData.map((data, index) => <Post text={data.text} likes={data.likesCount}/>)
				}
			</div>
		</div>
	)
}
