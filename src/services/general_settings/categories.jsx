import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export default async function fetchCategoriesList() {
	let CategoriesItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/general_settings/categories/`,
		});
		
		const { data } = response;
    CategoriesItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  return CategoriesItems;
}

export async function createCategoriesAPI(payload) {
	let createCategories = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/general_settings/categories/create/`,
      data: payload
		}).then(response => {
      return response;
    });

    // @ts-ignore
    createCategories = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}

	return createCategories;
}

export async function updateCategoriesAPI(payload) {
  let updateCategories = [];
  const CategoryId = payload.categories_id;

  try{
    const content = {
      method: API_PUT_METHOD,
      url:`/general_settings/categories/update/${CategoryId}/`,
      data: payload
    }
    const response = await axiosPhase2API(content);
    // @ts-ignore
    updateCategories = await response;
  }
  catch(error) {
    Message.error();  
  }
  return updateCategories;
}


