import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { messagesActions, startMessagesListening, stopMessagesListening } from '../../../Redux/messages-reducer';
import { selectMessagesData, selectWsStatus } from '../../../Redux/messages-selectors';
import { MessageDataType } from '../../../types/types';
import Preloader from '../../../UI/Preloader';
import { scrollElementToBottom } from '../../../utils/helpers/events';
import classes from '../Messages.module.scss';
import WriteMessageForm from '../WriteMessage';
import Message from './Message';
import ScrollToBottomBtn from './ScrollToBottomBtn';


type PropsType = {};

const MessagesList: React.FC<PropsType> = React.memo(({}) => {
	const messagesData = useSelector(selectMessagesData);
	const connectionStatus = useSelector(selectWsStatus);
	
	const [isAutoscroll, setIsAutoscroll] = React.useState<boolean>(false)

	const listRef = React.useRef<HTMLDivElement>(null);

	console.log('connection status', connectionStatus);  

	const dispatch = useDispatch();
	const startMessagesListener = () => {
		dispatch(startMessagesListening() as unknown as AnyAction);
	}
	const stopMessagesListener = () => {
		dispatch(stopMessagesListening() as unknown as AnyAction);
	}
	
	const messagesListHeight = listRef.current?.scrollHeight;
	//on scroll
	const handleScroll = () => {
		const listScroll = (listRef.current?.scrollTop || 0)  + (listRef.current?.clientHeight || 0);
		setIsAutoscroll((messagesListHeight || 0) - listScroll + 20 < 300);
	}

	//connecting to channel 
	React.useEffect(() => {
		startMessagesListener();
		return () => {
			stopMessagesListener();
		}
	}, []);

	React.useEffect(() => {

		if(isAutoscroll) {
			scrollElementToBottom(listRef.current);
		}
	}, [messagesData]);

	const list = messagesData.map((data) => {
		return <Message data={data} key={data.id}/>
	});
	return (
		<div className={classes.currChatWrap}> 
			{connectionStatus === 'ready' ?
				<>
					<div className={classes.currChat} ref={listRef} onScroll={handleScroll}>
						{ list }
						{!isAutoscroll && <ScrollToBottomBtn element={listRef.current}/> }
					</div>
					<WriteMessageForm isConnecting={false}/>
				</> 
			: <Preloader />
			}
		</div>
	)
});

export default MessagesList;