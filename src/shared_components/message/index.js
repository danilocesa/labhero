import { message as AntMessage } from 'antd';

const defaultMessage = 'Something went wrong, please try again.';
const defaultDuration = 0;

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

	static success = (param) => {
		AntMessage.success(param.message || defaultMessage, param.duration || defaultDuration, param.onClose);
	}
}

export default Message;