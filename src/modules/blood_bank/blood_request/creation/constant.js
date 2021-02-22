import vdltnMessage from 'global_config/error_messages';

export const FIELD_RULES = {
	lastName: [
		{ required: true, message: vdltnMessage.required },
		{ max: 50, message: vdltnMessage.maxLength(50) },
	],
	middleName: [
		{ max: 15, message: vdltnMessage.maxLength(15) },
	],
	firstName: [
		{ required: true, message: vdltnMessage.required },
		{ max: 50, message: vdltnMessage.maxLength(50) },
	],
	suffix: [
		{ max: 5, message: vdltnMessage.maxLength(5) },
	],
	contactNumber: [
		{ required: true, message: vdltnMessage.required },
	],
	email: [
		{ required: true, message: vdltnMessage.required },
		{ type: 'email', message: 'Please input valid email.' }
	],
	province: [
		{ required: true, message: vdltnMessage.required }
	],
	city: [
		{ required: true, message: vdltnMessage.required }
	],
	barangay: [
		{ required: true, message: vdltnMessage.required }
	],
	address: [
		{ required: true, message: vdltnMessage.required }
	],
	gender: [
		{ required: true, message: 'Please select gender' }
	],
	dateOfBirth: [
		{ required: true, message: vdltnMessage.required }
	],
	hospital: [
		{ required: true, message: vdltnMessage.required }
	],
	physician: [
		{ required: true, message: vdltnMessage.required }
	],
	license: [
		{ required: true, message: vdltnMessage.required }
	],
	bloodGroup: [
		{ required: true, message: vdltnMessage.required }	
	],
	dateNeeded: [
		{ required: true, message: vdltnMessage.required },
	],
};

