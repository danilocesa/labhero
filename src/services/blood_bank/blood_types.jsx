import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export async function fetchBloodTypes() {
	let bloodTypes = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `blood_inventory/bloodtype/for_lov`,
		});
		
		const { data } = response;
    bloodTypes = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodTypes;
}
