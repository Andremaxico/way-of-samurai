import { RootStateType } from './redux-store';
export const selectPostsData = (state: RootStateType) => {
	return state.profilePage.postsData;
}

export const selectCurrentUserProfileInfo = (state: RootStateType) => {
	return state.profilePage.currUserProfileInfo;
}
export const selectMyProfileInfo = (state: RootStateType) => {
	return state.profilePage.myProfileInfo
}

export const selectFormError = (state: RootStateType) => {
	return state.profilePage.myProfileFormError;
}