import React from 'react'
import classes from './NewPost.module.scss';

export default function NewPost() {
  return (
	<div className={classes.newPost}>
		<h2 className={classes.title}>My posts</h2>
		<form className={classes.form}>
			<textarea className={classes.textarea} placeholder='Input your post message...'></textarea>
			<button className={classes.submitBtn}>Submit</button>
		</form>
	</div>
  )
}
