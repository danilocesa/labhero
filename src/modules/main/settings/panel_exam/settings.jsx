import { globalRequiredMessage, globalTablePageSize} from 'shared_components/constant-global';
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



export const tablePageSize = globalTablePageSize;