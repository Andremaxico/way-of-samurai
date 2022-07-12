import { connect } from 'react-redux';
import { addPostAction, updateNewPostValueAction } from '../../../Redux/profileReducer';
import NewPost from './NewPost';

const mapStateToProps = (state) => {
	return {
		newPostText: state.profilePage.newPostText,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: () => {
			const action = addPostAction();
			dispatch(action);
		},
		updateNewPostValue: (value) => {
			const action = updateNewPostValueAction(value);
			dispatch(action);
		}
	}
}

const NewPostContainer = connect(mapStateToProps, mapDispatchToProps)(NewPost);

export default NewPostContainer;