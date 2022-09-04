import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { messagesActions } from '../../../Redux/messages-reducer';
import { selectMessagesData } from '../../../Redux/messages-selectors';
import { MessageDataType } from '../../../types/types';
import classes from '../Messages.module.scss';
import WriteMessageForm from '../WriteMessage';
import Message from './Message';

export const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');


type PropsType = {};

const MessagesList: React.FC<PropsType> = React.memo(({}) => {
	//const messagesData = useSelector(selectMessagesData);
	const [messagesData, setMessagesData] = React.useState<Array<MessageDataType>>([]);

	const listRef = React.useRef<HTMLDivElement>(null);


	const dispatch = useDispatch();

	const wsMessageHandler = (e: MessageEvent<any>) => {
		console.log('set messages data');
		//dispatch(messagesActions.setMessagesData((JSON.parse(e.data))));
		setMessagesData( (prevData) => [...prevData, ...JSON.parse(e.data)]);
		/*listRef?.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});*/
	}
	React.useEffect(() => {
		wsChannel.addEventListener('message', wsMessageHandler);
		return () => {
			wsChannel.removeEventListener('message', wsMessageHandler);
		}
	}, [])

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