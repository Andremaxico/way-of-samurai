import { RootStateType } from "./redux-store";

export const getIsAuthed = (state: RootStateType): boolean | null => {
	return state.auth.isAuthed;
} 
