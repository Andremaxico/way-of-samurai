import React from 'react'
import { updateNewPostValue } from '../../../Redux/state';
import classes from './NewPost.module.scss';

export default function NewPost(props) {
	//creating ref(no bene)
	let currentEl = React.createRef();

	//when user click button "addPost"
	const addPost = (event) => {
		const text = currentEl.current.value;
		if(text.length > 1) {
			props.addPost();
		}
		event.preventDefault();
	}

	const changeTextarea = event => {
		const value = event.target.value;
		updateNewPostValue(value);
	}

	return (
		<div className={classes.newPost}>
			<h2 className={classes.title}>My posts</h2>
			<form className={classes.form} onSubmit={ addPost }>
				<textarea onChange={ changeTextarea } placeholder='Add message' ref={currentEl} value={props.newPostText}></textarea>
				<button>Add Post</button>
			</form>
		</div>
	)
}
