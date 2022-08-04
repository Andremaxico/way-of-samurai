import { connect } from 'react-redux';
import NetworkError from '../UI/NetworkError';

const networkCheckMstp = (state) => {
	return {isNetworkError: state.app.isNetworkError};
}

const withNetworkCheck = (Component) => connect(networkCheckMstp)((props) => {
	if(props.isNetworkError) return <NetworkError />

	return <Component {...props} />
});

export default withNetworkCheck;