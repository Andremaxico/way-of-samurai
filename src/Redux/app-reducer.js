import { setAuthData } from './auth-reducer';

const INIT_SUCCESS = 'init-success';

const initialState = {
	isInitSuccess: false,
}


const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INIT_SUCCESS:
			return {
				...state,
				isInitSuccess: true,
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

export default appReducer;