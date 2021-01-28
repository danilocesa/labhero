import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod } from 'global_config/constant-global';

export async function fetchBloodGroupItems() {
	let bloodgroupItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
			url: `bloodbank/bloodgroup/search/`,
		});
		
		const { data } = response;
    bloodgroupItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodgroupItems;
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