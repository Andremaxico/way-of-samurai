import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { messagesActions, startMessagesListening, stopMessagesListening } from '../../../Redux/messages-reducer';
import { selectMessagesData } from '../../../Redux/messages-selectors';
import { MessageDataType } from '../../../types/types';
import classes from '../Messages.module.scss';
import WriteMessageForm from '../WriteMessage';
import Message from './Message';


type PropsType = {};

const MessagesList: React.FC<PropsType> = React.memo(({}) => {
	const messagesData = useSelector(selectMessagesData);
	const listRef = React.useRef<HTMLDivElement>(null);

	const [currData, setCurrData] = React.useState<MessageDataType[] | null>(null);

	console.log('messages data', messagesData);

	const dispatch = useDispatch();
	const startMessagesListener = () => {
		console.log('messgaes list start messgaes listener');
		dispatch(startMessagesListening() as unknown as AnyAction);
	}
	const stopMessagesListener = () => {
		dispatch(stopMessagesListening() as unknown as AnyAction);
	}


	//connecting to channel 
	React.useEffect(() => {
		console.log('messages list use effect');
		startMessagesListener();
		return () => {
			stopMessagesListener();
		}
	}, [currData]);

	React.useEffect(() => {
		const messagesListHeight = listRef.current?.scrollHeight;
		listRef.current?.scrollTo({
			top: messagesListHeight,
			behavior: 'smooth',
		});
	}, [messagesData]);

	const list = messagesData.map((data, index) => {
		if(data.isMy) {
			return <Message data={data} key={index}/>
		} else {
			return <Message data={data} key={index}/>
		}
	});
	return (
		<div className={classes.currChatWrap}> 
			<div className={classes.currChat} ref={listRef}>
				{ list }
			</div>
			<WriteMessageForm />
		</div>
	)
});

export default MessagesList;