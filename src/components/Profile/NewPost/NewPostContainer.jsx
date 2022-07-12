import React from 'react';
import { connect } from 'react-redux';
import { addPostCreator, updateNewPostValueCreator } from '../../../Redux/profile-reducer';
import NewPost from './NewPost';

const mapStateToProps = state => {
	console.log(state.profilePage.newPostText);
	return {
		newPostText: state.profilePage.newPostText
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateNewPostValue: (value) => {
			const action = updateNewPostValueCreator(value);
			dispatch(action);
		},
		addPost: () => {
			const action = addPostCreator();
			dispatch(action);
		},
	}
}

const NewPostContainer = connect(mapStateToProps, mapDispatchToProps)(NewPost);

export default NewPostContainer;
