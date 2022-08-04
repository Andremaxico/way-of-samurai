import catchNetWorkError from '../helpers/catchNetworkError';
import { setAuthData } from './authReducer';

const INIT_APP = 'INIT_APP';
const SET_NETWORK_ERROR = 'set-network-error';

const initialState = {
	isInit: false,
	isNetworkError: false,
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INIT_APP:
			return {...state, isInit: true}
		case SET_NETWORK_ERROR:
			return {...state, isNetworkError: action.value}
		default:
			return state;
	}
}

//actions creatoers
const initAppAC = () => {
	return {
		type: INIT_APP,
	}
}
export const setNetworkError = (value) => {
	return {
		type: SET_NETWORK_ERROR,
		value,
	}
}

//thunks
export const initApp = () => async (dispatch) => {
	catchNetWorkError(dispatch, async () => {
		await dispatch( setAuthData() );
		dispatch(initAppAC());
	})
}

export default appReducer;