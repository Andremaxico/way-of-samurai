import { setNetworkError } from "../Redux/appReducer";

const catchNetWorkError = async (dispatch, callback) => {
	try {
		const errMessage = await callback();
		dispatch( setNetworkError(false) );
		return errMessage;
	} catch (e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true));
	}
}

export default catchNetWorkError;