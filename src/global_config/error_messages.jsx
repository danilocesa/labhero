const validationMessage = {
	required: 'This field is required',
	minLength: (minLength) => `This field must be atleast ${minLength} characters`,
	maxLength: (maxLength) => `This field cannot be longer than ${maxLength} characters`,
	email: 'Please input valid email',
	number: 'Please input valid number',
	contactNum: 'Please input valid contact number',
	genericError: 'Something went wrong! Please try again'
}

export default validationMessage;