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
export const drawerTransactionTypeAdd = 'ADD TRANSACTION TYPE';
export const drawerTransactionTypeUpdate = 'UPDATE TRANSACTION TYPE';
export const drawerSupplierUpdate = 'UPDATE SUPPLIER';
export const drawerSupplierAdd = 'ADD SUPPLIER';
export const drawerUnitAdd = 'ADD UNIT OF MEASURE';
export const drawerUnitUpdate = 'UPDATE UNIT OF MEASURE';
export const drawerItemsUpdate = 'UPDATE ITEM';
export const drawerItemsAdd = 'ADD ITEM';
export const drawerTakeoutTitleUpdate = 'UPDATE TAKEOUT';
export const drawerTakeoutTitleAdd = 'ADD TAKEOUT';
export const drawerTakeoutUpdate = 'UPDATE TAKEOUT';


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

  suppliersName: "SUPPLIER'S NAME",
  suppliersContactPerson: "CONTACT PERSON",
  suppliersContactNumber: "CONTACT NUMBER",
  suppliersEmailAddress: "EMAIL ADDRESS",
  suppliersTin: "TIN NO.",
  suppliersUnit: "UNIT/HOUSE NO.",
  suppliersStreet: "STREET",
  suppliersBarangay: "BARANGAY",
  suppliersDistrict: "DISTRICT",
  suppliersZipCode: "ZIPCODE",
  suppliersItemDescription: "DESCRIPTION",

  transactionTypeCode: "TRANSACTION TYPE CODE",
  transactionTypeName: "TRANSACTION TYPE NAME",
  transactionTypeDescription: "DESCRIPTION",

  unit_name: "UNIT NAME",
  unit_symbol: "UNIT SYMBOL",

  itemName: "ITEM NAME",
  itemCategory: "CATEGORY",
  itemSection: "SECTION",
  itemUnitOfMeasure: "UNIT OF MEASURE",
  itemDefaultAmount: "DEFAULT AMOUNT",
  itemSkuBarcode: "SKU BARCODE",
  itemsUpcBarcode: "UPC BARCODE",
  ItemsItemDescription: "DESCRIPTION",

  ItemListName: "ITEM NAME",
  ItemListQuantity: "QUANTITY",
  ItemListThreshold: "THRESHOLD"

  


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
export const addransactionTypeButton = 'ADD TRANSACTION TYPE';
export const addUnitMeasure = 'ADD UNIT OF MEASURE';
export const addItems = 'ADD ITEM';
export const addInventoryList = 'ADD INVENTORY';
export const addTakeout = 'TAKEOUT';
export const addRestock = 'RESTOCK';

export const tableYScroll = globalTableYScroll;