import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
<<<<<<< HEAD
import { apiGetMethod, apiPostMethod, apiPutMethod } from 'global_config/constant-global';



export async function getBloodInventory() {
	let BloodInventory = [];
	const pageSize = 100;
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
      url: `blood_inventory/bloodinventory`
		});
		
		const { data } = response;
    BloodInventory = data;
    console.log(data);
  } 
  catch(e) {
    Message.error();
	}
	
  return BloodInventory;
}

export async function getBloodType() {
	let getBloodType = [];
	const pageSize = 100;
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
      url: `blood_inventory/bloodtype/for_lov`
		});
		
		const { data } = response;
    getBloodType = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return getBloodType;
}

export async function getStorage() {
	let getStorage = [];
	const pageSize = 100;
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
      url: `blood_inventory/blood_storage/for_lov`
		});
		
		const { data } = response;
    getStorage = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return getStorage;
}

export async function createInventoryItems(vData) {
	let createCategoryItems = [];

	try{
		const content = {
            method: apiPostMethod,
            url: 'inventory/categories/create/',
			data: vData
		}

		const response = await axiosPhase2API(content);
		// @ts-ignore
		createCategoryItems = await response;
	}
	catch(error) {
		Message.error();
	}

	return createCategoryItems;
}

export async function updateInventoryItems(vData) {
    let updateCategoryItems = [];
    const categoryId = vData.category_id;
    console.log(vData);
	try{
		const content = {
            method: apiPutMethod,
            url: `inventory/categories/update/${categoryId}/`,
			data: vData
		}

		const response = await axiosPhase2API(content);
		// @ts-ignore
		updateCategoryItems = await response;

	}
	catch(error) {
		Message.error();
	}

	return updateCategoryItems;
}

export async function searchInventoryItems(value) {
    let searchCategoryItems = [];
    const categoryName = value.category_name
  try{
    const content = {
        method: apiGetMethod,
        url: `inventory/categories/?search=${categoryName}`,
        data: searchCategoryItems
    }

        const response = await axiosPhase2API(content);
        // @ts-ignore
        searchCategoryItems = await response;
  } 
  catch(e) {
    Message.error();
	}
	
  return searchCategoryItems;
}
=======
import { API_GET_METHOD } from 'global_config/constant-global';

export async function searchInventory(payload) {
	let bloodinventory = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `blood_inventory/bloodinventory/search`,
      params: payload
		});
		
		const { data } = response;
    bloodinventory = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodinventory;
}

export async function getInventoryById(id) {
	let bloodinventory = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `blood_inventory/bloodinventory/${id}`,
		});
		
		const { data } = response;
    bloodinventory = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodinventory;
}
>>>>>>> 99d5f4c268697133734616a5bc2fa0687a9d52b7
