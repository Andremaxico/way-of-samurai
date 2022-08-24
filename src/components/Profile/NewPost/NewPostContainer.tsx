import * as React from 'react';
import { connect } from 'react-redux';
import { profileActions } from '../../../Redux/profile-reducer';
import NewPost from './NewPost';

type MapDispatchToPropsType = {
	addPost: (newPostValue: string) => void,
}

const NewPostContainer = connect<null, MapDispatchToPropsType>(null, {addPost: profileActions.addPost})(NewPost);

export default NewPostContainer;
