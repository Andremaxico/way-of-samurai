import React from 'react';
import classes from './NewPost.module.scss';

export default function NewPost(props) {
	//creating ref(no bene)
	let currentEl = React.createRef();

	//when user click button "addPost"
	const addPost = (event) => {
		const text = currentEl.current.value;
		props.onAddPost(event, text);
	}
	
	//when user inout smt in textarea
	const changeTextarea = event => {
		props.onTextareaChange(event);
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
