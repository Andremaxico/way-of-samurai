import React from 'react';
import { connect } from 'react-redux';
import { addPostCreator, updateNewPostValueCreator } from '../../../Redux/profile-reducer';
import StoreContext from '../../../StoreContext';
import NewPost from './NewPost';


function PostContainer(props) {
	//when user click button "addPost"
	 return <StoreContext.Consumer >
		{store => {
			const addPost = (event, value) => {
				if (value.length > 1) {
					store.dispatch(addPostCreator(value));
				}
				event.preventDefault();
			}
			//when user inout smt in textarea
			const changeTextarea = event => {
				const value = event.target.value;
				const action = updateNewPostValueCreator(value);
				store.dispatch(action);
			}
		
			return (
				<NewPost
					updateNewPostValue={changeTextarea} 
					onAddPost={addPost}
					newPostText={store.newPostText}
				/>
			)
		}}
	</StoreContext.Consumer>
}

const mapStateToProps = state => {
	debugger;
	return {
		newPostText: state.profilePage.newPostText
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateNewPostValue: (event) => {
			dispatch(updateNewPostValueCreator(event.target.value))
		},
		addPost: () => dispatch(addPostCreator()),
	}
}

const NewPostContainer = connect(mapStateToProps, mapDispatchToProps)(NewPost);

export default NewPostContainer;
