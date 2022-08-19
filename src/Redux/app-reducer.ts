import { setAuthData } from './auth-reducer';

const INIT_SUCCESS = 'INIT_SUCCESS';
const SET_NETWORK_ERROR = 'SET_NETWORK_ERROR';

export type AppStateType = {
	isInitSuccess: boolean,
	isNetworkError: boolean,
}

const initialState: AppStateType = {
	isInitSuccess: false,
	isNetworkError: false,
}


const appReducer = (state = initialState, action: any): AppStateType => {
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

type SetInitSuccessType = {
	type: typeof INIT_SUCCESS,
}

export const setInitSuccess = (): SetInitSuccessType => {
	return   {type: INIT_SUCCESS};
}

export const initApp = () => async (dispatch: any) => {
	const promise = await dispatch(setAuthData());
	dispatch( setInitSuccess() );
}

type SetNetworkErrorActionType = {
	type: typeof SET_NETWORK_ERROR,
	isError: boolean,
}

export const setNetworkError = (isError: boolean): SetNetworkErrorActionType => {
	return {
		type: SET_NETWORK_ERROR,
		isError,
	}
}

export default appReducer;