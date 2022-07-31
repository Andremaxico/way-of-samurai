import { setAuthData } from './auth-reducer';

const INIT_SUCCESS = 'init-success';
const SET_NETWORK_ERROR = 'SET_NETWORK_ERROR';

const initialState = {
	isInitSuccess: false,
	isNetworkError: false,
}


const appReducer = (state = initialState, action) => {
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

export const setInitSuccess = () => {
	return  {type: INIT_SUCCESS};
}

export const initApp = () => async (dispatch) => {
	const promise = await dispatch(setAuthData());
	dispatch( setInitSuccess() );
}

export const setNetworkError = (isError) => {
	return {
		type: SET_NETWORK_ERROR,
		isError,
	}
}

export default appReducer;