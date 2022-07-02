import React from 'react'

export default function Profile() {
  return (
	<div className='Profile'>
		<div className='Profile__cover'>
			<img src='https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg'/>
		</div>
		<div className='ProfileInfo'>
			<div className="ProfileInfo__avatar">
				
			</div>
		</div>
		<div className='new-post'>
			my posts title
			<form className='PostForm'>
				New post
			</form>
		</div>
		<div className='MyPosts'>
			posts
			<div>
				post1
			</div>
			<div>
				post2
			</div>
		</div>
	</div>
  )
}
