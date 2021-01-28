import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod } from 'global_config/constant-global';

export default async function fetchRequest(name ,request_id) {
  let Patient = '';
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
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
      method: apiGetMethod,
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
