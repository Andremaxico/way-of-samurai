import { MessageDataType } from "../types/types"

type SubscriberType = (messages: Array<MessageDataType>) => void;

let subscribers = [] as Array<SubscriberType>;

const wsMessageHandler = (e: MessageEvent<any>) => {
	const newMessages = JSON.parse(e.data);
	console.log('message handler data', newMessages);
	console.log('subscribers', subscribers);
	subscribers.forEach(sub => sub(newMessages))
}

let ws: WebSocket;
const closeHandle = () => {
	console.error('websocket closed');
	setTimeout(() => {
		createChannel();
	}, 3000);
};

const createChannel = () => {
	console.log('create channel');
	ws?.removeEventListener('close', closeHandle);
	ws?.close();

	ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
	ws.addEventListener('close', closeHandle);
	ws.addEventListener('message', wsMessageHandler);
}

export const chatAPI = {
	subscribe(callback: SubscriberType) {
		subscribers.push(callback);
		return () => {
			subscribers.filter(s => s !== callback);
		}
	},
	createChannel() {
		createChannel();
	},
	sendMessage(message: string)  {
		ws.send(message);
	},

	close() {
		subscribers = [];
		ws?.close();
		ws?.removeEventListener('message', wsMessageHandler);
		ws?.removeEventListener('close', closeHandle);
	},

	unsubscribe(callback: SubscriberType) {
		subscribers.filter(s => s !== callback);
	}
}