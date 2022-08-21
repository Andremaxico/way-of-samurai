import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { setAuthData } from './auth-reducer';
import { RootStateType } from './redux-store';

const INIT_SUCCESS = 'INIT_SUCCESS';
const SET_NETWORK_ERROR = 'SET_NETWORK_ERROR';

export type AppStateType = {
	isInitSuccess: boolean,
	isNetworkError: boolean,
}

type ActionType = SetInitSuccessActionType | SetNetworkErrorActionType;
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionType>;
type DispatchType = Dispatch<ActionType | ThunkType>;

const initialState: AppStateType = {
	isInitSuccess: false,
	isNetworkError: false,
}


const appReducer = (state = initialState, action: AnyAction): AppStateType => {
	switch (action.type) {
		case INIT_SUCCESS:
			return {
				...state,
				isInitSuccess: true,
			}
		case SET_NETWORK_ERROR:
			return {
				...state,
				isNetworkError: action.isError
			}
		default:
			return state
	}
}


//==========================ACTION CREATORS======================
type SetInitSuccessActionType = {
	type: typeof INIT_SUCCESS,
}

export const setInitSuccess = (): SetInitSuccessActionType => {
	return  {type: INIT_SUCCESS};
}

export type SetNetworkErrorActionType = {
	type: typeof SET_NETWORK_ERROR,
	isError: boolean,
}

export const setNetworkError = (isError: boolean): SetNetworkErrorActionType => {
	return {
		type: SET_NETWORK_ERROR,
		isError,
	}
}

//========================THUNKS====================
export const initApp = (): ThunkType => async (dispatch: DispatchType) => {
	await dispatch(setAuthData());
	dispatch( setInitSuccess() );
}

export default appReducer;