import errorMessage from 'global_config/error_messages';

const FIELD_RULES = {
	Username: [
		{ required: true, message: 'Please enter your username!' },
		{ max: 20, message: errorMessage.maxLength(20) }
	],
	password: [
		{ required: true, message: 'Please enter your password!' },
		{ max: 20, message: errorMessage.maxLength(20) }
	],
};

export default FIELD_RULES;
