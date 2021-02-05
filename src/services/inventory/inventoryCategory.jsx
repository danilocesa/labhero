import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';



export async function getInventoryItems() {
	let getCategoryItems = [];
	const pageSize = 100;
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `inventory/categories/?page_size=${pageSize}`
		});
		
		const { data } = response;
        getCategoryItems = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return getCategoryItems;
}


export async function createInventoryItems(vData) {
	let createCategoryItems = [];

	try{
		const content = {
            method: API_POST_METHOD,
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
            method: API_PUT_METHOD,
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
        method: API_GET_METHOD,
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