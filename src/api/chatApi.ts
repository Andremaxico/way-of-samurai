import { MessageDataType } from "../types/types"

export type OnMessageSubscriberType = (messages: Array<MessageDataType>) => void;
export type OnStatusChangeSubscriberType = (status: StatusType) => void;
export type StatusType = 'ready' | 'pending';
type ChatSubscribersEventsType = 'messages-sub' | 'status-sub';
type ChatSubscribersType = OnStatusChangeSubscriberType | OnMessageSubscriberType;
type SubsObjType = {
	'messages-sub': Array<OnStatusChangeSubscriberType | OnMessageSubscriberType>,
	'status-sub': Array<OnStatusChangeSubscriberType | OnMessageSubscriberType>,
}

let subscribers: SubsObjType = {
	'messages-sub': [],
	'status-sub': [],
};



const cleanup = () => {
	ws?.removeEventListener('message', wsMessageHandler);
	ws?.removeEventListener('close', closeHandle);
}

const wsMessageHandler = (e: MessageEvent<any>) => {
	const newMessages = JSON.parse(e.data);
	subscribers['messages-sub'].forEach((sub: OnMessageSubscriberType) => sub(newMessages))
}

const notifyStatusSubscribers = (value: StatusType) => {
	//@ts-ignore
	subscribers['status-sub'].forEach(s => s(value));
}

let ws: WebSocket;
const closeHandle = () => {
	notifyStatusSubscribers('pending');
	setTimeout(() => {
		createChannel();
	}, 3000);
};

const openHandler = () => {
	notifyStatusSubscribers('ready');
}

const createChannel = () => {
	console.log('create channel');
	cleanup();
	ws?.close();

	ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

	notifyStatusSubscribers('pending');

	ws.addEventListener('open', openHandler);
	ws.addEventListener('close', closeHandle);
	ws.addEventListener('message', wsMessageHandler);
}

export const chatAPI = {
	subscribe(subType: ChatSubscribersEventsType, callback: ChatSubscribersType) {
		subscribers[subType].push(callback);
		return () => {
			subscribers[subType].filter(s => s !== callback);
		}
	},
	createChannel() {
		createChannel();
	},
	sendMessage(message: string)  {
		console.log('send message', message);
		ws.send(message);
	},

	close() {
		subscribers['messages-sub'] = [];
		subscribers['status-sub'] = [];
		cleanup();
		ws?.close();
		
	},

	unsubscribe(subType: ChatSubscribersEventsType, callback: ChatSubscribersType) {
		subscribers[subType].filter(s => s !== callback);
	}
}