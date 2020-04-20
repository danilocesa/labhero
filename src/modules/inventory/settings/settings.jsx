import { globalTablePageSize, globalTableSize,globalTableYScroll } from 'global_config/constant-global';
import errorMessage from 'global_config/error_messages';
// constant variables, titles strictly implemented and shared within the module.


// UserMaintenance Variables
export const moduleTitle = 'PANEL EXAM';

export const drawerAddTitle = 'ADD PANEL';
export const drawerUpdateTitle = 'UPDATE PANEL';
export const drawerSectionTitle = 'UPDATE SECTION';
export const drawerSectionTitleAdd = 'ADD SECTION';
export const drawerCategoryTitleUpdate = 'UPDATE CATEGORY';
export const drawerCategoryTitleAdd = 'ADD CATEGORY';
export const drawerStorageTitleAdd = 'ADD STORAGE';
export const drawerStorageTitleUpdate = 'UPDATE STORAGE';

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
  categories_code: "CATEGORY CODE",
  categories_name: "CATEGORY NAME",
  categories_description: "DESCRIPTION",
  section_code: "SECTION CODE",
  section_name: "SECTION NAME",
  section_description: "DESCRIPTION",
  field_status: "STATUS",
  is_active : "ACTIVE",
  storage_name: "STORAGE NAME",
  storage_description: "DESCRIPTION",
  suppliersName: "SUPPLIERS NAME",
  suppliersContactPerson: "CONTACT PERSON",
  suppliersContactNumber: "CONTACT NUMBER",
  suppliersEmailAddress: "EMAIL ADDRESS",
  suppliersUnit: "UNIT/HOUSE NO.",
  suppliersStreet: "STREET",
  suppliersBarangay: "BARANGAY",
  suppliersDistrict: "DISTRICT",
  suppliersZipCode: "ZIPCODE",
  suppliersItemDescription: "ITEM DESCRIPTION"

}

export const buttonLabels = {
    cancel: "CANCEL",
    create: "ADD",
    update: "UPDATE"
}



export const tablePageSize = globalTablePageSize;
export const tableSize = globalTableSize;

export const addUserButton = 'ADD USER';
export const addSectionButton = 'ADD SECTION';
export const addCategoriesButton = 'ADD CATEGORY';
export const addStorageButton = 'ADD STORAGE';
export const addSupplierButton = 'ADD SUPPLIER';

export const tableYScroll = globalTableYScroll;