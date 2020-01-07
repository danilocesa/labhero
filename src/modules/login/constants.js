import errorMessage from 'global_config/error_messages';

const FIELD_RULES = {
	Username: [
		{ required: true, message: 'Please enter your username!' },
		{ min: 3, message: errorMessage.minLength(3) },
		{ max: 20, message: errorMessage.maxLength(20) }
	],
	password: [
		{ required: true, message: 'Please enter your password!' },
		{ min: 3, message: errorMessage.minLength(3) },
		{ max: 20, message: errorMessage.maxLength(20) }
	],
};

export default FIELD_RULES;
