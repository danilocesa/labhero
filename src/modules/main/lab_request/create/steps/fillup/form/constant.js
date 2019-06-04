const FIELD_RULES = {
	hospitalID: [
    { required: true, message: 'This field is required..' }
	],
	email: [
		{ required: true, message: 'This field is required.' },
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
		{ required: true, message: 'This field is required.' }
	],
	contactNo: [
		{ required: true, message: 'This field is required.' },
		{ pattern: /^[9]\d{9}/, message: 'Please input valid contact number.' }
	],
	gender: [
		{ required: true, message: 'Please select gender' }
	],
	location: [
		{ required: true, message: 'This field is required.' }
	],
	physicianId: [
		{ required: true, message: 'This field is required.' }
	],
	visit: [
		{ required: true, message: 'This field is required.' }
	],
	chargeSlip: [
		{ required: true, message: 'This field is required.' }
	],
	officialReceipt: [
		{ required: true, message: 'This field is required.' }
	],
	bed: [
		{ required: true, message: 'This field is required.' }
	],
	comment: [

	],
	
};

export default FIELD_RULES;
