import { connect } from 'react-redux';
import ChatsList from './ChatsList';

const mapStateToProps = (state) => {
	return {
		usersInfo: state.messagesPage.usersInfo,
	}
}

export default connect(mapStateToProps)(ChatsList);