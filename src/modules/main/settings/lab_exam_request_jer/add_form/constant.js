const FIELD_RULES = {
	examName: [
    { required: true, message: 'This field is required.' }
	],
	examCode: [
    { required: true, message: 'This field is required.' }
	],
	loinc: [
    { required: false, message: 'This field is required.' }
	],
	integrationCode: [
    { required: true, message: 'This field is required.' }
	],
	examSort: [
		{ required: true, message: 'This field is required.' },
	],
	sectionID: [
		{ required: false, message: 'This field is required.' },
	],
	specimenID: [
		{ required: false, message: 'This field is required.' },
	],
};

export default FIELD_RULES;
