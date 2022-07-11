import React from 'react';
import { connect } from 'react-redux';
import { addPostCreator, updateNewPostValueCreator } from '../../../Redux/profile-reducer';
import NewPost from './NewPost';

const mapStateToProps = state => {
	return {
		newPostText: state.profilePage.newPostText
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateNewPostValue: (value) => {
			dispatch(updateNewPostValueCreator(value))
		},
		addPost: () => dispatch(addPostCreator()),
	}
}

const NewPostContainer = connect(mapStateToProps, mapDispatchToProps)(NewPost);

export default NewPostContainer;
