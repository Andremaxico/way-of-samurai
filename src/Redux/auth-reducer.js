const SET_AUTH_DATA = 'set-auth-data';

const initialState = {
	data: {
		login: null,
		email: null,
		id: null,
		isAuthed: false,
	},
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH_DATA:
			return {
				...state,
				data: {...action.data, isAuthed: true},
			}
	
		default:
			return state
	}
}

export const setAuthData = (data) => {
	return {
		type: SET_AUTH_DATA,
		data,
	}
}

export default authReducer;