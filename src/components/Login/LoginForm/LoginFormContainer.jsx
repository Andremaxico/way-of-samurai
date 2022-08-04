import { connect } from "react-redux";
import LoginForm from './LoginForm';
import { login } from '../../../Redux/authReducer';
import { compose } from "redux";
import withNetworkCheck from "../../../hocs/withNetworkCheck";

const mapStateToProps = (state) => {
	return {
		isAuthed: state.auth.isAuthed,
	}
}

export default compose(
	connect(mapStateToProps, {login}),
	withNetworkCheck,
)
(LoginForm);