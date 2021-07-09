import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export default async function fetchNormalValuesItems() {
	let normalvaluesItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `bloodbank/normal_values/`,
		});
		
		const { data } = response;
    normalvaluesItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return normalvaluesItems;
}

export async function createNormalValuesAPI(payload) {
	let createUserAccount = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `bloodbank/normal_values/`,
      data: payload
		}).then(response => {
      return response;
    });

    // @ts-ignore
    createUserAccount = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}

	return createUserAccount;
}

export async function updateNormalValuesAPI(payload) {
  let updateNormalValues = [];
  const normalValuesId = payload.normal_value_id;

  try{
    const content = {
      method: API_PUT_METHOD,
      url:`bloodbank/normal_values/${normalValuesId}/`,
      data: payload
    }

    const response = await axiosPhase2API(content);
    // @ts-ignore
    updateNormalValues = await response;
  }
  catch(error) {
    Message.error();
  }

  return updateNormalValues;
}

