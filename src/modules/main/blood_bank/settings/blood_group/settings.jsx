import { globalTablePageSize, globalTableSize } from 'global_config/constant-global';
import errorMessage from 'global_config/error_messages';
// constant variables, titles strictly implemented and shared within the module.


// UserMaintenance Variables
export const moduleTitle = 'PANEL EXAM';
export const drawerAddTitle = 'ADD PANEL';
export const drawerUpdateTitle = 'UPDATE PANEL';

export const messagePrompts = {
  noExamFound: "No exam request found!",
  successCreatePanel: "Successfully created! Reloading page...",
  successUpdatePanel: "Update successful! Reloading page..."
}

export const fieldRules = {
	blood_group_name: [
		{ required: true, message: errorMessage.required },
		{ max: 254, message: errorMessage.maxLength(254) }
	],
	blood_group_description: [
		{ required: true, message: errorMessage.required },
		{ max: 50, message: errorMessage.maxLength(50) }
	]
};


export const fieldLabels = {
  id:"ID",
  blood_group_name: "BLOOD GROUP NAME",
  blood_group_description: "CATEGORIES DESCRIPTION",

}

export const buttonLabels = {
    cancel: "CANCEL",
    create: "ADD",
    update: "UPDATE"
}



export const tablePageSize = globalTablePageSize;
export const tableSize = globalTableSize;