import {globalTablePageSize} from 'global_config/constant-global';
import errorMessage from 'global_config/error_messages';
// constant variables, titles strictly implemented and shared within the module.

// SearchPatient Variables
export const moduleTitle = 'EDIT PATIENT DEMOGRAPHICS';
export const tablePageSize = globalTablePageSize;

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
		{ required: true, message: errorMessage.required }
	],
	firstname: [
		{ required: true, message: errorMessage.required}
	],
	middlename: [
		{ required: true, message: errorMessage.required}
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
		{ required: false, message: errorMessage.required}
	],
	emailAddress:  [
		{ required: false, message: errorMessage.required}
	],
	unitNo: [
		{ required: false, message: errorMessage.required}
	],
}