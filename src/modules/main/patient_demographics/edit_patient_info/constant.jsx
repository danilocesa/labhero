const REQUIRED_MESSAGE = 'This field is required';
const FIELD_RULES = {
  lastname: [
    { required: true, message: REQUIRED_MESSAGE }
  ],
  firstname: [
		{ required: true, message: REQUIRED_MESSAGE}
  ],
  middlename: [
		{ required: true, message: REQUIRED_MESSAGE}
  ],
  suffix: [
    { required: false, message: REQUIRED_MESSAGE}
  ],
  gender: [
		{ required: true, message: REQUIRED_MESSAGE}
  ],
  dateOfBirth: [
    { required: true, message: REQUIRED_MESSAGE}
  ],
  contactNumber:  [
		{ required: false, message: REQUIRED_MESSAGE}
  ],
  emailAddress:  [
		{ required: false, message: REQUIRED_MESSAGE}
  ],
  unitNo: [
		{ required: true, message: REQUIRED_MESSAGE}
  ],
 
}

export default FIELD_RULES;