import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { messagesActions, startMessagesListening, stopMessagesListening } from '../../../Redux/messages-reducer';
import { selectMessagesData, selectWsStatus } from '../../../Redux/messages-selectors';
import { MessageDataType } from '../../../types/types';
import Preloader from '../../../UI/Preloader';
import classes from '../Messages.module.scss';
import WriteMessageForm from '../WriteMessage';
import Message from './Message';


type PropsType = {};

const MessagesList: React.FC<PropsType> = React.memo(({}) => {
	const messagesData = useSelector(selectMessagesData);
	const connectionStatus = useSelector(selectWsStatus);

	const listRef = React.useRef<HTMLDivElement>(null);

	console.log('connection status', connectionStatus);  

	const dispatch = useDispatch();
	const startMessagesListener = () => {
		dispatch(startMessagesListening() as unknown as AnyAction);
	}
	const stopMessagesListener = () => {
		dispatch(stopMessagesListening() as unknown as AnyAction);
	}


	//connecting to channel 
	React.useEffect(() => {
		startMessagesListener();
		return () => {
			stopMessagesListener();
		}
	}, []);

	React.useEffect(() => {
		const messagesListHeight = listRef.current?.scrollHeight;
		const listScroll = (listRef.current?.scrollTop || 0)  + (listRef.current?.clientHeight || 0);
		const isAutoScroll = (messagesListHeight || 0) - listScroll + 20 < 300;
		
		if(isAutoScroll) {
			listRef.current?.scrollTo({
				top: messagesListHeight,
				behavior: 'smooth',
			});
		}
	}, [messagesData]);

	const list = messagesData.map((data) => {
		return <Message data={data} key={data.id}/>
	});
	return (
		<div className={classes.currChatWrap}> 
			{connectionStatus === 'ready' ?
				<>
					<div className={classes.currChat} ref={listRef}>
						{ list }
					</div>
					<WriteMessageForm isConnecting={false}/>
				</> 
			: <Preloader />
			}
		</div>
	)
});

export default MessagesList;