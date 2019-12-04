import { message as AntMessage } from 'antd';
import {globalErrorMessage} from 'shared_components/constant-global';

const defaultDuration = 3;

class Message {
	static info = (message) => {
		AntMessage.info(message || globalErrorMessage);
	}

	static error = (message) => {
		AntMessage.error(message || globalErrorMessage);
	}

	static warning = (message) => {
		AntMessage.warning(message || globalErrorMessage);
	}

	static success = (param) => {
		AntMessage.success(param.message || globalErrorMessage, param.duration || defaultDuration, param.onClose);
	}
}

export default Message;