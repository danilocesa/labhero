import errorMessage from 'global_config/error_messages';

export const FIELD_RULES = {
	hospitalID: [
		{ max: 50, message: errorMessage.maxLength(50) }
	],
	emailAdd: [
		{ type: 'email', message: errorMessage.email },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	firstName: [
		{ required: true, message: errorMessage.required },
		{ min: 2, message: errorMessage.minLength(2) },
		{ max: 50, message: errorMessage.maxLength(50) }
	],
	middleName: [
		{ required: true, message: errorMessage.required },
		{ max: 15, message: errorMessage.maxLength(15) }
	],
	lastName: [
		{ required: true, message: errorMessage.required },
		{ min: 2, message: errorMessage.minLength(2) },
		{ max: 50, message: errorMessage.maxLength(50) }
	],
	suffix: [
		{ max: 5, message: errorMessage.maxLength(5) }
	],
	dateOfBirth: [
		{ required: true, message: errorMessage.required }
	],
	address: [],
	contactNumber: [
		{ min: 8, message: errorMessage.minLength(8) },
		{ max: 10, message: errorMessage.maxLength(10) }
	],
	gender: [
		{ required: true, message: 'Please select gender' }
	],
	province: [
		{ required: true, message: errorMessage.required }
	],
	addr_line_1: [
		{ required: true, message: errorMessage.required }
	]
};

export const messagePrompts = {
  successCreateUser: "Successfully created!",
  successUpdateUser: "Update successful!"
}

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
	contactNumber : "CONTACT NUMBER",
	patientGender : "PATIENT'S GENDER"
};

export const selectDefaultOptions = "PLEASE SELECT ONE";


