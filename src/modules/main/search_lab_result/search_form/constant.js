const FIELD_RULES = {
	dateCategory: [
    { 
			required: true, 
			message: 'This field is required.' 
		}
	],
	dateSpan: [
    { 
			required: true, 
			message: 'This field is required.' }
	],
	status: [
    { 
			required: true, 
			message: 'This field is required.' 
		}
	],
	patientID: [
    { 
			pattern: '^[0-9]+$', 
			message: 'Numbers only!' }
	],
	patientName: [
		{ 
			max: 100, 
			message: 'Less than 100 characters only!' 
		},
		{ 
			pattern: '^[a-zA-Z0-9äöüÄÖÜ]*$', 
			message: 'Special character not allowed!'
		}
	],
};

export default FIELD_RULES;
