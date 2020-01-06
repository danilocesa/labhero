import {globalTablePageSize, globalRequiredMessage} from 'shared_components/constant-global';

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
		{ required: true, message: globalRequiredMessage }
	],
	firstname: [
		{ required: true, message: globalRequiredMessage}
	],
	middlename: [
		{ required: true, message: globalRequiredMessage}
	],
	suffix: [
		{ required: false, message: globalRequiredMessage}
	],
	gender: [
		{ required: true, message: globalRequiredMessage}
	],
	dateOfBirth: [
		{ required: true, message: globalRequiredMessage}
	],
	contactNumber:  [
		{ required: false, message: globalRequiredMessage}
	],
	emailAddress:  [
		{ required: false, message: globalRequiredMessage}
	],
	unitNo: [
		{ required: false, message: globalRequiredMessage}
	],
}