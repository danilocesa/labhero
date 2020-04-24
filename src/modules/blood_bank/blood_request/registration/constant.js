import vdltnMessage from 'global_config/error_messages';

export const selectDefaultOptions = "PLEASE SELECT";

export const formLabels = {
	lastName: 'LAST NAME', 
	firstName: 'FIRST NAME', 
	middleName:'MIDDLE NAME',
	suffix: 'SUFFIX',
	gender: 'GENDER',
	dateOfBirth: 'DATE OF BIRTH',
	age: 'AGE',
	city: 'CITY',
	barangay: 'BARANGAY',
	unitNo: {
		label:'HOUSE NO./UNIT/FLOOR NO., BLDG NAME, BLK OR LOT NO.',
		fieldName: 'address',
	},
	contactNumber: 'MOBILE NO.',
	emailAddress: 'EMAIL ADDRESS'
};

export const FIELD_RULES = {
	lastName: [
		{ required: true, message: 'This field is required..' },
		{ max: 50, message: vdltnMessage.maxLength(50) },
	],
	middleName: [
		{ max: 15, message: vdltnMessage.maxLength(15) },
	],
	firstName: [
		{ required: true, message: 'This field is required.' },
		{ max: 50, message: vdltnMessage.maxLength(50) },
	],
	suffix: [
		{ max: 5, message: vdltnMessage.maxLength(5) },
	],
	contactNumber: [
		{ required: true, message: 'This field is required.' },
	],
	email: [
		{ required: true, message: 'This field is required.' },
		{ type: 'email', message: 'Please input valid email.' }
	],
	address: [
		{ required: true, message: 'This field is required.' }
	],
	gender: [
		{ required: true, message: 'Please select gender' }
	],
	dateOfBirth: [
		{ required: true, message: 'This field is required.' }
	],
	hospital: [
		{ required: true, message: 'This field is required.' }
	],
	bloodGroup: [
		{ required: true, message: 'This field is required.' }	
	],
	bloodBag: [
		{ required: true, message: 'This field is required.' },
	],
	dateCollected: [
		{ required: true, message: 'This field is required.' }
	],
	bodyWeight: [
		{ required: true, message: 'This field is required.' }
	],
	pulseRate: [
		{ required: true, message: 'This field is required.' }
	],
	bloodPressure: [
		{ required: true, message: 'This field is required.' }
	],
	hemoglobin: [
		{ required: true, message: 'This field is required.' }
	],
	bodyTemperature: [
		{ required: true, message: 'This field is required.' }
	],
	bagWeight: [
		{ required: true, message: 'This field is required.' }
	],
};

