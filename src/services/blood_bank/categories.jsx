import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod, apiPostMethod, apiPutMethod } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export default async function fetchCategoriesList() {
	let CategoriesItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
			url: `/bloodbank/Categories/`,
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
  console.log(payload,"payload")
	let createCategories = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: apiPostMethod,
      url: `/bloodbank/Categories/create/`,
      data: payload
		}).then(response => {
      return response;
    });

    console.log("API response",axiosResponse)
    // @ts-ignore
    createCategories = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}

	return createCategories;
}

export async function updateCategoriesAPI(payload) {
  console.log(payload.categories_id,"payload api")
  let updateCategories = [];
  const CategoryId = payload.categories_id;

  try{
    const content = {
            method: apiPutMethod,
            url:`/bloodbank/Categories/update/${CategoryId}/`,
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


