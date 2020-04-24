import errorMessage from 'global_config/error_messages';

const FIELD_RULES = {
	PatientID: [
		{ required: true, message: 'Please enter patient ID' },
		{ max: 20, message: errorMessage.maxLength(20) }
	],
	PatientName: [
		{ required: true, message: 'Please enter name' },
		{ max: 20, message: errorMessage.maxLength(20) }
	],
};

export default FIELD_RULES;
