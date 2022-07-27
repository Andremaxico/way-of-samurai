import React from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import defaultAvatar from '../../../assests/images/default-user-avatar.png';

const mapStateToProps = state => {
	return {
		postsData: state.profilePage.postsData,
		avatarUrl: state.profilePage.currUserProfileInfo?.photos.small ||
					  defaultAvatar,
	}
}

const MyPostsContainer = connect(mapStateToProps)(MyPosts);

export default MyPostsContainer;
