import * as React from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { PostDataType } from '../../../types/types';
import { RootStateType } from '../../../Redux/redux-store';

type MapStateToPropsType = {
	postsData: Array<PostDataType>,
	avatarUrl: string,
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
	return {
		postsData: state.profilePage.postsData,
		avatarUrl: state.profilePage.currUserProfileInfo?.photos?.small
	}
}

const MyPostsContainer = connect<MapStateToPropsType>(mapStateToProps)(MyPosts);

export default MyPostsContainer;
