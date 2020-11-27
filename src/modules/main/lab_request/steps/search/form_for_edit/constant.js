import errorMessage from 'global_config/error_messages';

export const FIELD_RULES = {
	patientId: [
		{ max: 20, message: errorMessage.maxLength(20) }
	],
	patientName: [
		{ min: 2, message: errorMessage.minLength(2) },
		{ max: 100, message: errorMessage.maxLength(100) }
	]
};