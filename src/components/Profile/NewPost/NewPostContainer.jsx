import React from 'react';
import { addPostCreator, updateNewPostValueCreator } from '../../../Redux/profile-reducer';
import NewPost from './NewPost';


function NewPostContainer(props) {
	//when user click button "addPost"
	const addPost = (event, value) => {
		if (value.length > 1) {
			props.dispatch(addPostCreator(value));
		}
		event.preventDefault();
	}
	//when user inout smt in textarea
	const changeTextarea = event => {
		const value = event.target.value;
		const action = updateNewPostValueCreator(value);
		props.dispatch(action);
	}

	return (
		<NewPost
			onTextareaChange={changeTextarea} 
			onAddPost={addPost}
			newPostText={props.newPostText}
		/>
	)
}

export default NewPostContainer;
