import ChatsList from "./ChatsList"
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		chatsData: state.messagesPage.chatsData
	}
}

const ChatsListContainer = connect(mapStateToProps)(ChatsList);

export default ChatsListContainer;