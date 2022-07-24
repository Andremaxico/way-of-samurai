import React from 'react';
import { connect } from 'react-redux';
import { addPost} from '../../../Redux/profile-reducer';
import NewPost from './NewPost';

const mapStateToProps = state => {
	return {
		newPostText: state.profilePage.newPostText
	}
}

const NewPostContainer = connect(mapStateToProps, {addPost})(NewPost);

export default NewPostContainer;
