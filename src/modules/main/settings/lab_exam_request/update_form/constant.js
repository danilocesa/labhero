export const FIELD_RULES = {
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
		{ type: 'number', message: 'This field is for numbers only.'}
	],
	sectionID: [
		{ required: true, message: 'This field is required.' },
		{ type: 'number', message: 'This field is for numbers only.'}
	],
	specimenID: [
		{ required: true, message: 'This field is required.' },
		{ type: 'number', message: 'This field is for numbers only.'}
	],
};

export const FIELD_LABELS = {
	examName : 'NAME*', 
	examCode: 'CODE*',
	loinc: 'LOINC',
	integrationCode: 'INTEGRATION CODE',
	examSort: 'EXAM SORT*',
	sectionID : 'SECTION ID*',
	specimenID : 'SPECIMEN ID*',
};

// export default FIELD_RULES;
