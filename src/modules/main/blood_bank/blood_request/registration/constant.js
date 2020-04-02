import vdltnMessage from 'global_config/error_messages';

const FIELD_RULES = {
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
		{  }
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
		{ required: true, message: 'This field is required.' }
	],
	requiredDate: [
		{ required: true, message: 'This field is required.' }
	],
	
};

export default FIELD_RULES;
