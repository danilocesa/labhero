import errorMessage from 'global_config/error_messages';

const FIELD_RULES = {
	dateCategory: [
    { 
			required: false, 
			message: errorMessage.required 
		}
	],
	dateSpan: [
    { 
			required: false, 
			message: errorMessage.required }
	],
	status: [
    { 
			required: true, 
			message: errorMessage.required 
		}
	],
	patientID: [
    { 
			pattern: '^[0-9]+$', 
			message: errorMessage.number 
		}
	],
	patientName: [
		{ 
			max: 100, 
			message: errorMessage.maxLength(100)
		},
		// { 
		// 	pattern: '^[a-zA-Z0-9äöüÄÖÜ]*$', 
		// 	message: 'Special characters are not allowed.'
		// }
	],
};

export default FIELD_RULES;
