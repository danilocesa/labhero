import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export async function fetchStatus(payload) {
	let Status = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/blood_inventory/blood_storage/`,
		});
		
		const { data } = response;
    Status = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return Status;
}

export default fetchStatus;
