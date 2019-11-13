export const drawerTitle = 'ADD EXAM REQUEST';
export const FIELD_RULES = {
	examName: [
    { required: true, message: 'This field is required.' }
	],
	examCode: [
    { required: false, message: 'This field is required.' }
	],
	loinc: [
    { required: false, message: 'This field is required.' }
	],
	integrationCode: [
    { required: false, message: 'This field is required.' }
	],
	examSort: [
		{ required: false, message: 'This field is required.' },
	],
	sectionID: [
		{ required: false, message: 'This field is required.' },
	],
	specimenID: [
		{ required: false, message: 'This field is required.' },
	],
};

export const FIELD_LABELS = {
	examName : 'NAME', 
	examCode: 'CODE',
	loinc: 'LOINC',
	integrationCode: 'INTEGRATION CODE',
	examSort: 'EXAM SORT',
	sectionID : 'SECTION ID',
	specimenID : 'SPECIMEN ID',
};

export default FIELD_RULES;
