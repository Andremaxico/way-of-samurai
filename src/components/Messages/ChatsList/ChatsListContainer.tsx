import { connect } from 'react-redux';
import { RootStateType } from '../../../Redux/redux-store';
import { UserInfoType } from '../../../types/types';
import ChatsList from './ChatsList';

export type ChatsListPropsType = {
	usersInfo: Array<UserInfoType>,
}

const mapStateToProps = (state: RootStateType): ChatsListPropsType => {
	return {
		usersInfo: state.messagesPage.usersInfo,
	}
}

export default connect<ChatsListPropsType>(mapStateToProps)(ChatsList);