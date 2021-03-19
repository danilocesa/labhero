import { globalTableSize, globalTableYScroll} from 'global_config/constant-global';
import vdltnMessage from 'global_config/error_messages';


export const moduleTitle = 'BLOOD GROUP';
export const drawerAdd = 'ADD';
export const drawerUpdate = 'UPDATE';


export const drawerAddTitle = 'ADD USER ACCOUNT';
export const drawerUpdateTitle = 'UPDATE USER ACCOUNT';
export const addUserButton = 'ADD USER';


export const buttonLabels = {
	cancel: "CANCEL"
}

export const tableHeaders = {
	ID: "ID",
	bloodGroup: "BLOOD GROUP",
	description: "DESCRIPTION",
};


export const messagePrompts = {
  successCreateUser: "Successfully created! Reloading page...",
  successUpdateUser: "Update successful! Reloading page..."
}

export const fieldLabels = {
	ID: "ID",
	bloodGroup: "BLOOD GROUP",
	description: "DESCRIPTION",
}
export const tableSize = globalTableSize;
export const tableYScroll = globalTableYScroll;

export const fieldRules = {
	id: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	bloodGroup: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) }
	],
	description: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
};