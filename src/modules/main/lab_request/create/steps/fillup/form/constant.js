const FIELD_RULES = {
  caseNumber: [
    { required: true, message: 'This field is required..' }
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
	age: [
    // { required: true, message: 'This field is required.' }
	],
	gender: [
    { required: true, message: 'Please select gender' }
	],
	ward: [
    { required: true, message: 'This field is required.' }
	],
	physicianId: [
    { required: true, message: 'This field is required.' }
	],
	class: [
    { required: true, message: 'This field is required.' }
	],
	comment: [
    { required: true, message: 'This field is required.' }
	],
	amount: [
    { required: true, message: 'This field is required.' }
	],
};

export default FIELD_RULES;
