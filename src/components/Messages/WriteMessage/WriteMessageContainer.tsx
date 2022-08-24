import * as React from 'react';
import { messagesActions } from '../../../Redux/messages-reducer';
import WriteMessage from './WriteMessage'; 
import { connect } from 'react-redux';

type MapDispatchToPropsType = {
	addMessage: (value: string) => void;
}

const WriteMessageContainer = connect<null, MapDispatchToPropsType>(null, {addMessage: messagesActions.addMessage})(WriteMessage);

export default WriteMessageContainer;