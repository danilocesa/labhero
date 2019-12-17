import {globalTablePageSize, globalTableSize, globalRequiredMessage, globalTableYScroll} from 'shared_components/constant-global';
// constant variables, titles strictly implemented and shared within the module.

export const moduleTitle = 'USER MAINTENANCE';

export const drawerAdd = 'ADD';
export const drawerUpdate = 'UPDATE';
export const labels = {
	personalInfoLabel: 'PERSONAL INFORMATION', 
	accountInfoLabel: 'ACCOUNT INFORMATION', 
	otherInfoLabel:'OTHER INFORMATION',
};

export const errorMessages = {
	requiredField : globalRequiredMessage,
	password : {
		doesNotMatch : 'Password and Repeat Password does not match!',
	},
};

export const drawerAddTitle = 'ADD USER ACCOUNT';
export const drawerUpdateTitle = 'UPDATE USER ACCOUNT';
export const addUserButton = 'ADD USER';

export const buttonLabels = {
	cancel: "CANCEL"
}

export const tableHeaders = {
	userID : 'USER ID',
	userName : 'USERNAME',
	firstName : 'FIRST NAME',
	middleName : 'MIDDLE NAME',
	lastName : 'LAST NAME',
};

export const fieldLabels = {
	userID: "USERID",
	firstName: "FIRST NAME",
	middleName: "MIDDLE NAME",
	lastName: "LAST NAME",
	username: "USERNAME",
	password: "PASSWORD",
	repeatPassword: "REPEAT PASSWORD",
	registrationNo: "REGISTRATION NO.",
	registrationValidity: "REGISTRATION VALIDITY",
	userRights: "USER RIGHTS"
}

export const tablePageSize = globalTablePageSize;
export const tableSize = globalTableSize;
export const tableYScroll = globalTableYScroll;


export const fieldRules = {
	panel_name: [
	{ required: true, message: globalRequiredMessage }
	],
	panel_code: [
	{ required: true, message: globalRequiredMessage }
	],
	examItemType: [
    { required: true, message: globalRequiredMessage }
	],
	unitOfMeasure: [
    { required: true, message: globalRequiredMessage }
	],
	integrationCode: [
    { required: false, message: globalRequiredMessage }
	]
};