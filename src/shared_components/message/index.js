import { message as AntMessage } from 'antd';
import Messages from 'global_config/error_messages';

const defaultDuration = 3;

class Message {
	static info = (message) => {
		AntMessage.info(message || Messages.genericError);
	}

	static error = (message) => {
		AntMessage.error(message || Messages.genericError);
	}

	static warning = (message) => {
		AntMessage.warning(message || Messages.genericError);
	}

	static success = (param) => {
		AntMessage.success(param.message || Messages.genericError, param.duration || defaultDuration, param.onClose);
	}
}

export default Message;