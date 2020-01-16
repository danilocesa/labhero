import {globalTableYScroll, globalTableSize, globalTablePageSize} from 'global_config/constant-global';
import errorMessage from 'global_config/error_messages';
// constant variables, titles strictly implemented and shared within the module.

// Exam Request Variables

export const settings = {

};

export const messages = {
	updateSuccess : 'Exam request successfully updated.',
};

export const labels = {
	sectionLabel : "SECTION"
};

export const placeHolders = {
	specimenDropdown : "Filter by Specimen",
	sectionDropdown : "Select Section",
};

export const selectedTableConst = {
	labels : {
		examTitle : 'EXAM',
		groupTitle : 'GROUP',
		formulaTitle : 'FORMULA',
		lockTitle : 'LOCK',
		sortTitle : 'SORT',
	}
};

export const tableYScroll = globalTableYScroll;
export const tableSize = globalTableSize;
export const tablePageSize = globalTablePageSize;

export const drawerTitle = {
	add: "ADD EXAM REQUEST",
	update: "UPDATE EXAM REQUEST"
}

export const buttonNames = {
	cancel: "CANCEL",
	create: "ADD",
	update: "UPDATE",
	addExam: "ADD EXAM REQUEST"
}

export const fieldRules = {
	examName: [
		{ required: true, message: errorMessage.required },
		{ max: 254, message: errorMessage.maxLength(254) }
	],
	examCode: [
		{ required: false, message: errorMessage.required },
		{ max: 50, message: errorMessage.maxLength(50) }
	],
	loinc: [
		{ required: false, message: errorMessage.required },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	integrationCode: [
		{ required: false, message: errorMessage.required },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	examSort: [
		{ required: false, message: errorMessage.required },
		// { max: 32, message: errorMessage.maxLength(32) }
	],
	sectionID: [
		{ required: false, message: errorMessage.required },
	],
	specimenID: [
		{ required: false, message: errorMessage.required },
	],
};

export const fieldLabels = {
	examName : 'NAME', 
	examCode: 'CODE',
	loinc: 'LOINC',
	integrationCode: 'INTEGRATION CODE',
	examSort: 'EXAM SORT',
	sectionID : 'SECTION ID',
	specimenID : 'SPECIMEN ID',
};

export const moduleTitles = {
	create: "CREATE REQUEST",
	edit: "EDIT REQUEST",
};

export const requestTypes = {
	create: 'create',
	edit: 'edit',
};

export const requestLinks = {
	create: {
		base: '/request/create/',
		step1:'/request/create/step/1',
		step2:'/request/create/step/2',
		step3:'/request/create/step/3',
		step4:'/request/create/step/4',
	},
	edit: {
		base: '/request/edit/',
		step1:'/request/edit/step/1',
		step2:'/request/edit/step/2',
		step3:'/request/edit/step/3',
		step4:'/request/edit/step/4',
	},
};

// gets the appropriate moduleTitle according to session request type
// 12/26/2019 -- bugged when used in other steps. works well in /lab_exam_request. --J-kv
export const moduleTitle = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.edit) ? moduleTitles.edit : moduleTitles.create;

export default settings;