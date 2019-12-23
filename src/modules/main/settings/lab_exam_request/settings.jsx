import {globalTableYScroll, globalTableSize, globalRequiredMessage,globalTablePageSize} from 'shared_components/constant-global';
// constant variables, titles strictly implemented and shared within the module.

// Exam Request Variables
// export const moduleTitle = 'EXAM REQUEST';

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
    { required: true, message: globalRequiredMessage }
	],
	examCode: [
    { required: false, message: globalRequiredMessage }
	],
	loinc: [
    { required: false, message: globalRequiredMessage }
	],
	integrationCode: [
    { required: false, message: globalRequiredMessage }
	],
	examSort: [
		{ required: false, message: globalRequiredMessage },
	],
	sectionID: [
		{ required: false, message: globalRequiredMessage },
	],
	specimenID: [
		{ required: false, message: globalRequiredMessage },
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

const moduleTitles = {
	create: "CREATE REQUEST",
	edit: "EDIT REQUEST",
};

const requestTypes = {
	create: 'create',
	edit: 'edit',
};

const requestlinks = {
	create: '/request/create/',
	edit: '/request/edit/',
};

// gets the appropriate moduleTitle according to session request type
export const moduleTitle = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.edit) ? moduleTitles.edit : moduleTitles.create;
// export const requestTypeLink = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.edit ) ? requestlinks.edit : requestlinks.create;