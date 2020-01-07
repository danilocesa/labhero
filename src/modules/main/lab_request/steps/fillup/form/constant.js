import errorMessage from 'global_config/error_messages';

export const FIELD_RULES = {
	hospitalID: [
		{ max: 50, message: errorMessage.maxLength(50) }
	],
	emailAdd: [
		{ type: 'email', message: errorMessage.email },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	givenName: [
		{ required: true, message: errorMessage.required },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	middleName: [
		{ required: true, message: errorMessage.required },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	lastName: [
		{ required: true, message: errorMessage.required },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	suffix: [
		{ max: 50, message: errorMessage.maxLength(50) }
	],
	dateOfBirth: [
		{ required: true, message: errorMessage.required }
	],
	address: [],
	contactNumber: [
		{ pattern: /^[9]\d{9}/, message: errorMessage.contactNum },
		{ max: 45, message: errorMessage.maxLength(45) }
	],
	gender: [
		{ required: true, message: 'Please select gender' }
	],
	location: [
		{ required: true, message: errorMessage.required }
	],
	physicianId: [],
	visit: [
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	chargeSlip: [
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	officialReceipt: [
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	bed: [
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	comment: [
		{ max: 254, message: errorMessage.maxLength(254) }
	],
};

export const formLabels = {
	hospitalID: "HOSPITAL ID",
	patientID: "PATIENT ID",
	email: "EMAIL",
	firstName : "FIRST NAME",
	middleName : "MIDDLE NAME",
	lastName : "LAST NAME",
	suffix : "SUFFIX",
	dateOfBirth : "DATE OF BIRTH",
	age : "AGE",
	unitFloorBldg : "HOUSE NO./UNIT/FLOOR NO. BLDG. NAME",
	contactNumber : "CONTACT NUMBER",
	patientGender : "PATIENT'S GENDER",
	location : "LOCATION",
	physicianID : "PHYSICIAN ID",
	visit : "VISIT",
	chargeSlip : "CHARGE SLIP",
	officialReceipt : "OFFICIAL RECEIPT",
	bed : "BED",
	comment : "COMMENT", 
};

export const formPlaceholders = {
	phonePrefix : "+ 63",
	physician : "Select a physician",
}

export const selectDefaultOptions = "PLEASE SELECT ONE";

export default FIELD_RULES;
