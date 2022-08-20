import { RootStateType } from "./redux-store";

export const getIsAuthed = (state: RootStateType) => {
	return state.auth.data.isAuthed;
} 
