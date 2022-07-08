import React from 'react';
import classes from './NewPost.module.scss';

export default function NewPost(props) {
	//creating ref(no bene)
	let currentEl = React.createRef();

	console.log(props);

	//when user click button "addPost"
	function addPost(event) {
		const text = currentEl.current.value;
		if (text.length > 1) {
			props.addPost();
		}
		event.preventDefault();
	}

	const changeTextarea = event => {
		const value = event.target.value;
		props.updateNewPostValue(value);
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
