import { GLOBAL_TABLE_PAGE_SIZE, globalTableSize,globalTableYScroll } from 'global_config/constant-global';
import errorMessage from 'global_config/error_messages';
// constant variables, titles strictly implemented and shared within the module.


// UserMaintenance Variables

export const drawerAdd = 'ADD';
export const drawerUpdate = 'UPDATE';

export const moduleTitle = 'PANEL EXAM';
export const drawerAddTitle = 'ADD PANEL';

export const drawerBloodInventoryDetails = 'Blood Inventory Details'

export const messagePrompts = {
  noExamFound: "No exam request found!",
  successCreatePanel: "Successfully created! Reloading page...",
  successUpdatePanel: "Update successful! Reloading page...",

  successAddCategoryInv: " Successful!"
}

export const fieldRules = {
	panel_name: [
		{ required: true, message: errorMessage.required },
		{ max: 254, message: errorMessage.maxLength(254) }
	],
	panel_code: [
		{ required: true, message: errorMessage.required },
		{ max: 50, message: errorMessage.maxLength(50) }
	],
	examItemType: [
    { required: true, message: errorMessage.required }
	],
	unitOfMeasure: [
    { required: true, message: errorMessage.required }
	],
	integrationCode: [
		{ required: false, message: errorMessage.required },
		{ max: 50, message: errorMessage.maxLength(50) }
	]
};


export const fieldLabels = {
  ItemListName: "ITEM NAME",
  ItemListQuantity: "QUANTITY",
  ItemListThreshold: "THRESHOLD"
}

export const buttonLabels = {
    cancel: "CANCEL",
    create: "ADD",
    update: "UPDATE"
}



export const tablePageSize = GLOBAL_TABLE_PAGE_SIZE;
export const tableSize = globalTableSize;

// export const addUserButton = 'ADD USER';

export const tableYScroll = globalTableYScroll;