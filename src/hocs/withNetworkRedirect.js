import React from 'react';
import { connect } from 'react-redux';
import NetworkError from '../UI/NetworkError';

const NetworkRedirectMstp = (state) => {
	return {isNetworkError: state.app.isNetworkError};
}

const withNetworkRedirect = (Component) => connect(NetworkRedirectMstp)((props) => {
	if (props.isNetworkError) return <NetworkError />

	return <Component {...props} />
});

export default withNetworkRedirect;