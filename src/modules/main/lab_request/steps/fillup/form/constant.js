export const FIELD_RULES = {
	hospitalID: [
    // { required: true, message: 'This field is required..' }
	],
	emailAdd: [
		// { required: true, message: 'This field is required.' },
		{ type: 'email', message: 'Please input valid email.' }
	],
	givenName: [
		{ required: true, message: 'This field is required.' }
	],
	middleName: [
		{ required: true, message: 'This field is required.' }
	],
	lastName: [
		{ required: true, message: 'This field is required.' }
	],
	suffix: [
		{  }
	],
	dateOfBirth: [
		{ required: true, message: 'This field is required.' }
	],
	address: [
		// { required: true, message: 'This field is required.' }
	],
	contactNumber: [
		// { required: true, message: 'This field is required.' },
		{ pattern: /^[9]\d{9}/, message: 'Please input valid contact number.' }
	],
	gender: [
		{ required: true, message: 'Please select gender' }
	],
	location: [
		{ required: true, message: 'This field is required.' }
	],
	physicianId: [
		// { required: true, message: 'This field is required.' }
	],
	visit: [
		// { required: true, message: 'This field is required.' }
	],
	chargeSlip: [
		// { required: true, message: 'This field is required.' }
	],
	officialReceipt: [
		// { required: true, message: 'This field is required.' }
	],
	bed: [
		// { required: true, message: 'This field is required.' }
	],
	comment: [

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
	unitNo : {
		label:"HOUSE NO./UNIT/FLOOR NO. BLDG. NAME",
		fieldName: 'address',
	},
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
