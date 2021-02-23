import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export default async function fetchBloodProducts() {
	let bloodProducts = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `blood_recipient/bloodproduct/`,
		});
		
		const { data } = response;
    bloodProducts = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodProducts;
}