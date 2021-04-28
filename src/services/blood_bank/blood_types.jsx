import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export async function fetchBloodTypes() {
	let bloodTypes = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/general_settings/blood_type/`,
		});
		
		const { data } = response;
    bloodTypes = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodTypes;
}

export default async function createBloodGroupAPI(payload) {
	let createBloodTypes = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/general_settings/blood_type/create/`,
      data: payload
		}).then(response => {
      return response;
    });

    // @ts-ignore
    createBloodTypes = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	return createBloodTypes;
}