import * as React from 'react';
import { connect, DispatchProp, Matching } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { RootStateType } from '../Redux/redux-store';

type MapStatePropsType = {
	isAuthed: boolean,
}

const mapStateToPropsRedirect = (state: RootStateType): MapStatePropsType => {
	return {
		isAuthed: state.auth.isAuthed,
	}
}

function withLoginRedirect <P extends MapStatePropsType>(Component: React.ComponentType<P>)  {
	const ComponentContainer: React.FC<MapStatePropsType> = (props) => {
		const {isAuthed, ...restProps} = props;
		if (!isAuthed) return <Navigate to='/login' replace /> 

		return <Component {...restProps as P} />
	}
	return connect<MapStatePropsType>(mapStateToPropsRedirect)(ComponentContainer);
}

export default withLoginRedirect;