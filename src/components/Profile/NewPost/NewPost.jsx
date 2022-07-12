import React from 'react';
import classes from './NewPost.module.scss';

export default function NewPost(props) {
	//when user click button "addPost"
	const addPost = (event) => {
		if(props.newPostText.length > 0) {
			props.addPost();
		}
		event.preventDefault();
	}
	
	//when user inout smt in textarea
	const changeTextarea = event => {
		const text = event.target.value;
		props.updateNewPostValue(text);
	}

	return (
		<div className={classes.newPost}>
			<h2 className={classes.title}>My posts</h2>
			<form className={classes.form} onSubmit={ addPost }>
				<textarea onChange={ changeTextarea } placeholder='Add message' value={props.newPostText}></textarea>
				<button>Add Post</button>
			</form>
		</div>
	)
}
