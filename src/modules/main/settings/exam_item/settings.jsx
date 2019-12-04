import {globalTablePageSize, globalTableSize, globalRequiredMessage} from 'shared_components/constant-global';

export const moduleTitle = 'EXAM ITEMS';
export const drawerTitle = {
  add: "ADD EXAM",
  update: "UPDATE EXAM"
}

export const tablePageSize = globalTablePageSize;
export const tableSize = globalTableSize;

export const buttonNames = {
  addExamItem : 'ADD EXAM ITEM',
  cancel: 'CANCEL',
  create: 'ADD',
  addField: 'ADD FIELD',
  update: 'UPDATE'
}

export const messagePrompts = {
  successCreatedExamItems: 'Exam item successfully created.'
}

export const fieldRules = {
	examItemName: [
    { required: true, message: globalRequiredMessage }
	],
	examItemGeneralName: [
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
  examItemIntegrationCode: "INTEGRATION CODE"
}
