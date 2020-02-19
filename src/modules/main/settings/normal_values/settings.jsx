import {globalTablePageSize, globalTableSize, globalTableYScroll} from 'global_config/constant-global';
import errorMessage from 'global_config/error_messages';

export const moduleTitle = 'NORMAL VALUES'; 
export const tablePageSize = globalTablePageSize;
export const tableSize = globalTableSize;
export const tableYScroll = globalTableYScroll;

export const drawerTitle = {
  add: "ADD NORMAL VALUE",
  update: "UPDATE NORMAL VALUE"
}

export const formMode ={
  add: "add",
  update: "update"
}

export const messagePrompts = {
	successCreatedNormalValues: 'Normal Value successfully created.',
	successUpdatedNormalValues: 'Normal Value successfully updated.'
}

export const buttonNames = {
    addNormalValues : 'ADD NORMAL VALUE',
    cancel: 'CANCEL',
    create: 'ADD',
    addField: 'ADD FIELD',
    update: 'UPDATE'
  }

export const tableHeaders = {
  normalValues: {
    gender: {
      title:"GENDER",
      dataIndex: "gender",
    },
    ageBracket: {
      title:"AGE BRACKET",
      dataIndex:"ageBracket"
    },
    machine: {
      title:"MACHINE",
      dataIndex:"machine"
    },
    labelOfRange: {
      title:"LABEL OF RANGE",
      dataIndex:"labelOfRange"
    },
    displayValue: {
      title:"DISPLAY VALUE",
      dataIndex:"displayValue"
    }
  }
}

export const fieldLabels = {
  examItemName: "EXAM ITEM NAME",
  examItemGeneralName: "EXAM ITEM GENERAL NAME",
  examItemUnitCode: "UNIT OF MEASURES",
  gender: "GENDER",
  ageBracket: "AGE BRACKET",
  machine: "MACHINE",
  labelOfRange: "LABEL OF RANGE",
  displayValue: "DISPLAY VALUE",
  low: "LOW",
  high: "HIGH",
  displayFlag: "DISPLAY FLAG",
  print: "PRINT",
  release: "RELEASE"
}

export const fieldRules = {
  examItemName: [
		{ required: true, message: errorMessage.required },
		{ max: 200, message: errorMessage.maxLength(200) }
	],
	examItemGeneralName: [
		{ required: true, message: errorMessage.required },
		{ max: 50, message: errorMessage.maxLength(50) }
	],
  unitOfMeasure: [
    // { required: true, message: errorMessage.required }
	],
}