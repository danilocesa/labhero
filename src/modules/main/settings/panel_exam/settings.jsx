import { GLOBAL_TABLE_PAGE_SIZE, GLOBAL_TABLE_SIZE } from 'global_config/constant-global';
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
  examItemName: "EXAM ITEM NAME",
  examItemGeneralName: "EXAM ITEM GENERAL NAME",
  examItemTypeCode: "EXAM ITEM TYPE",
  examItemUnitCode: "UNIT OF MEASURES",
  examItemTypeDefault: "DEFAULT VALUE",
  examItemIntegrationCode: "INTEGRATION CODE",
  panel_id: "PANEL ID",
  panel_name: "PANEL NAME",
  panel_code: "PANEL CODE",
  panel_integration_code: "PANEL INTEGRATION CODE",
  panel_status: "STATUS"
}

export const buttonLabels = {
    cancel: "CANCEL",
    create: "ADD",
    update: "UPDATE"
}



export const tablePageSize = GLOBAL_TABLE_PAGE_SIZE;
export const tableSize = GLOBAL_TABLE_SIZE;