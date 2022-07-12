import React from 'react'
import classes from './NewPost.module.scss';

function NewPost(props) {
	const addPost = (event) => {
		event.preventDefault();
		if(props.newPostText.length > 1) {
			props.addPost();
		}
	}
	const updateTextareaValue = (event) => {
		const text = event.target.value;
		props.updateNewPostValue(text);
	}
	return (
		<div className={classes.newPost}>
			<h1 className={classes.title}>My posts</h1>
			<form className={classes.form} onSubmit={ addPost }>
				<textarea className={classes.textarea} onChange={ updateTextareaValue } value={props.newPostText} placeholder='Input your post message...'></textarea>
				<button className={classes.submitBtn}>Add post</button>
			</form>
		</div>
	)
}

export default NewPost;
