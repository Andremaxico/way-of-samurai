import React from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';

const mapStateToProps = state => {
	return {
		postsData: state.profilePage.postsData,
		avatarUrl: state.profilePage.myProfileInfo.avatarUrl,
	}
}

const MyPostsContainer = connect(mapStateToProps)(MyPosts);

export default MyPostsContainer;
