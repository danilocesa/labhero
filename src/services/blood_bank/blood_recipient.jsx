import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD } from 'global_config/constant-global';

export default async function fetchRequest(name ,request_id) {
  let Patient = '';
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: (name ? `/blood_recipient/bloodrecipient/search/?search=${name}` : `/blood_recipient/bloodrecipient/search/by_id/${request_id}/`) 
    });
    const { data } = await response;
    Patient = data
  }
  catch(error) {
    Message.error();
 	}
  
  return Patient;
}

export async function fetchBloodRecipientById(recipientID) {
	let bloodrecipient = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `blood_recipient/bloodrecipient/search/by_id/${recipientID}`,
		});
		
		const { data } = response;
    bloodrecipient = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodrecipient;
}

export async function createBloodRecipient(payload) {
	let result = null;
	
  try{
    const response = await axiosPhase2API({
      method: API_POST_METHOD,
			url: `/blood_recipient/bloodrecipient/create/`,
      data: payload
		});
		
		result = response;
  } 
  catch(e) {
    return false;
 	}
  
  return result;
}