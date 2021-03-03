import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import errorMessage from 'global_config/error_messages';
// constant variables, titles strictly implemented and shared within the module.

// SearchPatient Variables
export const moduleTitle = 'EDIT PATIENT DEMOGRAPHICS';
export const tablePageSize = GLOBAL_TABLE_PAGE_SIZE;

// SearchPatientForm variables
export const drawerUpdateTitle = 'EDIT PATIENT DEMOGRAPHICS';
export const drawerSubmitButton = 'SUBMIT';
export const drawerCancelButton = 'CANCEL';
export const formLabels = {
	lastName: 'LAST NAME', 
	firstName: 'FIRST NAME', 
	middleName:'MIDDLE NAME',
	suffix: 'SUFFIX',
	gender: 'GENDER',
	dateOfBirth: 'DATE OF BIRTH',
	age: 'AGE',
	city: 'CITY',
	barangay: 'BARANGAY',
	unitNo: {
		label:'HOUSE NO./UNIT/FLOOR NO., BLDG NAME, BLK OR LOT NO.',
		fieldName: 'address',
	},
	contactNumber: 'MOBILE NO.',
	emailAddress: 'EMAIL ADDRESS'
};
export const selectDefaultOptions = "PLEASE SELECT";
export const genderOptions = {
	male: 'MALE',
	female: 'FEMALE'
};

export const errorMessages = {
	requiredField : 'This is a required field.',
	password : {
		doesNotMatch : 'Password and Repeat Password does not match!',
	},
};

export const successMessages = {
	update : 'Changes successfully saved!'
};

export const fieldRules = {
	lastname: [
		{ required: true, message: errorMessage.required },
		{ min: 2, message: errorMessage.minLength(2) },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	firstname: [
		{ required: true, message: errorMessage.required},
		{ min: 2, message: errorMessage.minLength(2) },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	middlename: [
		{ required: true, message: errorMessage.required},
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	suffix: [
		{ required: false, message: errorMessage.required}
	],
	gender: [
		{ required: true, message: errorMessage.required}
	],
	dateOfBirth: [
		{ required: true, message: errorMessage.required}
	],
	contactNumber:  [
		{ min: 8, message: errorMessage.minLength(8) },
		{ max: 10, message: errorMessage.maxLength(10) },
		{ required: false, message: errorMessage.required}
	],
	emailAddress:  [
		{ type: 'email', message: errorMessage.email },
		{ required: false, message: errorMessage.required}
	],
	unitNo: [
		{ required: false, message: errorMessage.required}
	],
}