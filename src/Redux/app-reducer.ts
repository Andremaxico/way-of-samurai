import { getFriends } from './sidebar-reducer';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import { setAuthData } from './auth-reducer';
import { RootStateType, InferActionsType } from './redux-store';

const INIT_SUCCESS = 'INIT_SUCCESS';
const SET_NETWORK_ERROR = 'SET_NETWORK_ERROR';

export type AppStateType = {
	isInitSuccess: boolean,
	isNetworkError: boolean,
}

type ActionType = InferActionsType<typeof appActions>;
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionType>;
type DispatchType = Dispatch<ActionType | ThunkType>;

const initialState: AppStateType = {
	isInitSuccess: false,
	isNetworkError: false,
}


const appReducer = (state = initialState, action: ActionType): AppStateType => {
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
export const appActions = {
	setInitSuccess: () => ({type: INIT_SUCCESS} as const),
	
	setNetworkError: (isError: boolean) => ({
		type: SET_NETWORK_ERROR,
		isError,
	} as const),
}

//========================THUNKS====================
export const initApp = (): ThunkType => async (dispatch: DispatchType) => {
	await dispatch(setAuthData());
	dispatch( appActions.setInitSuccess() );
}

export default appReducer;