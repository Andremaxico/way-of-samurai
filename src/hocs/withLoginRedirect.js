import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const redirectMapStateToProps = (state) => {
	return { 
		isAuthed: state.auth.isAuthed,
	}
}

const withLoginRedirect = (Component) => connect(redirectMapStateToProps)((props) => {
	if(!props.isAuthed) return <Navigate to='/login' replace/>

	return <Component {...props}/>
});

export default withLoginRedirect;