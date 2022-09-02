import { RootStateType } from "./redux-store";

export const selectIsAuthed = (state: RootStateType): boolean | null => {
	return state.auth.isAuthed;
} 
export const selectCaptcha = (state: RootStateType) => {
	return state.auth.captchaUrl;
}
export const selectLoginError = (state: RootStateType) => {
	return state.auth.loginError;
}
export const selectAuthData = (state: RootStateType) => {
	return state.auth.data;
}