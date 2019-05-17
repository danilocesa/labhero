import { message as AntMessage } from 'antd';

const defaultMessage = 'Something went wrong, please try again.';

class Message {
	static info = (message) => {
		AntMessage.info(message || defaultMessage);
	}

	static error = (message) => {
		AntMessage.error(message || defaultMessage);
	}

	static warning = (message) => {
		AntMessage.warning(message || defaultMessage);
	}
}

export default Message;