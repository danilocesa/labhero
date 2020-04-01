import {globalTablePageSize, globalTableSize, globalTableYScroll} from 'global_config/constant-global';
import errorMessage from 'global_config/error_messages';

export const moduleTitle = 'NORMAL VALUES'; 
export const tablePageSize = globalTablePageSize;
export const tableSize = globalTableSize;
export const tableYScroll = globalTableYScroll;

export const drawerTitle = {
  normalValue: {
    add: "ADD NORMAL VALUE",
    update: "UPDATE NORMAL VALUE"
  },
  ageBracket: {
    add: "ADD AGE BRACKET",
    update: "UPDATE AGE BRACKET"
  },
  rangeClass: {
    add: "ADD RANGE LABEL",
    update: "UPDATE RANGE LABEL"
  }
}

export const formMode ={
  add: "add",
  update: "update"
}

export const messagePrompts = {
	successCreatedNormalValues: 'Normal Value successfully created.',
  successUpdatedNormalValues: 'Normal Value successfully updated.',
  successCreatedAgeBracket  : 'Age Bracket successfully created.',
  successUpdateAgeBracket  : 'Age Bracket successfully updated.',
  successCreatedRangeLabel  : 'Range Label successfully created.',
  successUpdateRangeLabel  : 'Range Label successfully updated.',
}

export const buttonNames = {
    addNormalValues : 'ADD NORMAL VALUE',
    addAgeBracket : 'ADD AGE BRACKET',
    addRangeClass : 'ADD RANGE CLASS',
    cancel: 'CANCEL',
    create: 'ADD',
    addField: 'ADD FIELD',
    update: 'UPDATE'
  }

export const tableHeaders = {
  normalValues: {
    gender: {
      title:"GENDER",
      dataIndex: "sex",
    },
    ageBracket: {
      title:"AGE BRACKET",
      dataIndex:"ageBracketLabel"
    },
    machine: {
      title:"MACHINE",
      dataIndex:"analyzerName"
    },
    labelOfRange: {
      title:"LABEL OF RANGE",
      dataIndex:"rangeClassLabel"
    },
    displayValue: {
      title:"DISPLAY VALUE",
      dataIndex:"displayValue"
    },
  },
  ageBracket: {
    rangeLabel:{
      title: "AGE BRACKET LABEL",
      dataIndex: "rangeLabel"
    },
    ageBracket:{
      title: "AGE BRACKET",
      dataIndex: "ageBracket"
    }
  },
  rangeLabelClass: {
    label: {
      title: "RANGE CLASS LABEL",
      dataIndex: "rangeClassLabel"
    }
  }
}

export const fieldLabels = {
  examItemName: "EXAM ITEM NAME",
  examItemGeneralName: "EXAM ITEM GENERAL NAME",
  examItemUnitCode: "UNIT OF MEASURES",
	gender: "GENDER",
	ageBracket: "AGE BRACKET",
	ageBracketFrom: "FROM AGE",
	ageBracketTo: "TO AGE",
  machine: "ANALYZER",
  labelOfRange: "LABEL OF RANGE",
  displayValue: "DISPLAY VALUE",
  low: "LOW",
  high: "HIGH",
  displayFlag: "DISPLAY FLAG",
  autoRelease: "AUTO RELEASE",
  release: "RELEASE",
  ageBracketRangeLabel: 'AGE BRACKET LABEL',
  ageRangeClassLabel: 'RANGE CLASS LABEL',
  ageBracketUnit: 'UNIT'
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
  ageBracketRangeLabel: [
    { required: true, message: errorMessage.required },
  ],
  ageBracketFrom: [
    { required: true, message: errorMessage.required }
  ],
  ageBracketTo: [
    { required: true, message: errorMessage.required }
  ],
  ageBracketUnit: [
    { required: true, message: errorMessage.required }
  ]

}

export const settingsOptions = [
  { label: "AGE BRACKET", value: 1 }, 
  { label: "RANGE CLASS LABEL", value: 2 }
];