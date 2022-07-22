import { useParams } from 'react-router-dom';

const withRouter = (Component) => (props) => {
	const params = useParams();
	return <Component {...props} router={{params}}/>
}

export default withRouter;