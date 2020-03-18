const FIELD_RULES = {
	lastName: [
    	{ required: true, message: 'This field is required..' }
	],
	middleName: [
		{  }
	],
	firstName: [
		{ required: true, message: 'This field is required.' }
	],
	suffix: [
		{  }
	],
	contactNumber: [
		{ required: true, message: 'This field is required.' },
		{ pattern: /^[9]\d{9}/, message: 'Please input valid contact number.' }
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

export default FIELD_RULES;
