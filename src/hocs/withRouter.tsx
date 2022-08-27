import * as React from 'react';
import {
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { RouterPropsType } from '../types/types';

const withRouter = <T extends RouterPropsType>(Component: React.ComponentType<T>) => 
	(props: T) => {
		const location = useLocation();
		const navigate = useNavigate();
		const params = useParams();
		return (
			<Component
				{...props as T}
				router={{ location, navigate, params }}
			/>
		);
}

export default withRouter;