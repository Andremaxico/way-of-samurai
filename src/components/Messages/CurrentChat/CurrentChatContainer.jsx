import CurrentChat from "./CurrentChat";
import { connect } from 'react-redux';
import { sendMessageAction, updateNewMessageValueAction } from "../../../Redux/messagesReducer";

const mapStateToProps = (state) => {
	return {
		messagesList: state.messagesPage.messagesList,
		newMessageValue: state.messagesPage.newMessageValue,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: () => {
			const action = sendMessageAction();
			dispatch(action);
		},
		updateNewMessageValue: (value) => {
			const action = updateNewMessageValueAction(value);
			dispatch(action);
		}
	}
}

const CurrentChatContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentChat);

export default CurrentChatContainer;