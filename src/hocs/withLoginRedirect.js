import React from 'react'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const mapStateToPropsRedirect = (state) => {
	return {
		isAuthed: state.auth.data.isAuthed,
	}
}

const withLoginRedirect = (Component) => {
	const ComponentContainer = (props) => {
		if (!props.isAuthed) return <Navigate to='/login' replace />

		return <Component {...props} />
	}
	return connect(mapStateToPropsRedirect)(ComponentContainer);
}

export default withLoginRedirect;