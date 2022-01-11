import { GLOBAL_TABLE_PAGE_SIZE, GLOBAL_TABLE_SIZE, GLOBAL_TABLE_YSCROLL} from 'global_config/constant-global';
import vdltnMessage from 'global_config/error_messages';
// constant variables, titles strictly implemented and shared within the module.

export const moduleTitle = 'USER MAINTENANCE';

export const drawerAdd = 'ADD';
export const drawerUpdate = 'UPDATE';
export const labels = {
	personalInfoLabel: 'PERSONAL INFORMATION', 
	accountInfoLabel: 'ACCOUNT INFORMATION', 
	otherInfoLabel:'OTHER INFORMATION',
};

export const errorMessage = {
	requiredField : vdltnMessage.required,
	password : {
		doesNotMatch : 'Password and Repeat Password does not match!',
	},
};

export const messagePrompts = {
  successCreateUser: "Successfully created! Reloading page...",
  successUpdateUser: "Update successful! Reloading page...",
	messageError:"Blood group is active..."
}


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
	userTypes: 'USER TYPE',
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

export const tablePageSize = GLOBAL_TABLE_PAGE_SIZE;
export const tableSize = GLOBAL_TABLE_SIZE;
export const tableYScroll = GLOBAL_TABLE_YSCROLL;


export const fieldRules = {
	panel_name: [
		{ required: true, message: vdltnMessage.required },
	],
	panel_code: [
		{ required: true, message: vdltnMessage.required }
	],
	examItemType: [
    { required: true, message: vdltnMessage.required }
	],
	unitOfMeasure: [
    { required: true, message: vdltnMessage.required }
	],
	integrationCode: [
    { required: false, message: vdltnMessage.required }
	],
	firstname: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	middlename: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) }
	],
	lastname: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	username: [
		{ required: true, message: vdltnMessage.required },
		{ max: 10, message: vdltnMessage.maxLength(10) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	password: [
		{ required: true, message: vdltnMessage.required },
		{ max: 12, message: vdltnMessage.maxLength(12) },
		{ min: 3, message: vdltnMessage.minLength(2) }
	],
	repeat_password: [
		{ required: true, message: vdltnMessage.required },
		{ max: 12, message: vdltnMessage.maxLength(12) },
		{ min: 3, message: vdltnMessage.minLength(2) }
	],
};