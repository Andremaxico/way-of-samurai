import { RootStateType } from '../Redux/redux-store';
import * as React from 'react';
import { connect } from 'react-redux';
import NetworkError from '../UI/NetworkError';

type MapStateToPropsType = {
	isNetworkError: boolean,
}

const NetworkRedirectMstp = (state: RootStateType): MapStateToPropsType => {
	return {isNetworkError: state.app.isNetworkError};
}

const withNetworkRedirect = (Component: any ) => {
	console.log(Component);
	return connect<MapStateToPropsType>(NetworkRedirectMstp)((props: any) => {
		if (props.isNetworkError)
			return <NetworkError />;

		return <Component { ...props } /> ;
	});
};

export default withNetworkRedirect;