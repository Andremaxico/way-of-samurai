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

function withNetworkRedirect <T>(Component: React.ComponentType<T>)  {
	return connect<MapStateToPropsType>(NetworkRedirectMstp)((props: MapStateToPropsType) => {
		const {isNetworkError, ...restProps} = props;
		if (props.isNetworkError)
			return <NetworkError />;

		return <Component { ...restProps as T} /> ;
	});
};

export default withNetworkRedirect;