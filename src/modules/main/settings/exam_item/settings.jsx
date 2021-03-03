import { GLOBAL_TABLE_PAGE_SIZE, globalTableSize, globalTableYScroll} from 'global_config/constant-global';
import errorMessage from 'global_config/error_messages';

export const moduleTitle = 'EXAM ITEMS';
export const drawerTitle = {
  add: "ADD EXAM",
  update: "UPDATE EXAM"
}

export const tablePageSize = GLOBAL_TABLE_PAGE_SIZE;
export const tableSize = globalTableSize;
export const tableYScroll = globalTableYScroll;

export const buttonNames = {
  addExamItem : 'ADD EXAM ITEM',
  cancel: 'CANCEL',
  create: 'ADD',
  addField: 'ADD FIELD',
  update: 'UPDATE'
}

export const messagePrompts = {
	successCreatedExamItems: 'Exam item successfully created.',
	successUpdatedExamItems: 'Exam item successfully updated.'
}

export const fieldRules = {
	examItemName: [
		{ required: true, message: errorMessage.required },
		// { type: 'number', message: '' },
		{ max: 200, message: errorMessage.maxLength(200) }
	],
	examItemGeneralName: [
		{ required: true, message: errorMessage.required },
		{ max: 50, message: errorMessage.maxLength(50) }
	],
	examItemType: [
    { required: true, message: errorMessage.required }
	],
	examItemTypeDefault: [
		// { max: 254, message: errorMessage.maxLength(254) }
	],
	unitOfMeasure: [
    // { required: true, message: errorMessage.required }
	],
	integrationCode: [
		{ required: false, message: errorMessage.required },
		{ max: 100, message: errorMessage.maxLength(100) }
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
