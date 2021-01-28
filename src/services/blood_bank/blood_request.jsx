import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod } from 'global_config/constant-global';

export async function fetchBloodRequestById(id) {
	let bloodRequest = [];
	
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
			url: `blood_recipient/bloodproductrequest/${id}`,
		});
		
		const { data } = response;
    bloodRequest = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodRequest;
}