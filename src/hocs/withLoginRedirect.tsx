import * as React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootStateType } from '../Redux/redux-store';

type MapStateToPropsType = {
	isAuthed: boolean,
}

const mapStateToPropsRedirect = (state: RootStateType): MapStateToPropsType => {
	return {
		isAuthed: state.auth.isAuthed,
	}
}

const withLoginRedirect = (Component: React.FC) => {
	const ComponentContainer = (props: any) => {
		if (!props.isAuthed) return <Navigate to='/login' replace />

		return <Component {...props} />
	}
	return connect<MapStateToPropsType>(mapStateToPropsRedirect)(ComponentContainer);
}

export default withLoginRedirect;