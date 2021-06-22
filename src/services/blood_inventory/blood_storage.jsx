import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export async function fetchBloodStorageForLov() {
	let bloodStorage = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/blood_inventory/blood_storage/for_lov`,
		});
		
		const { data } = response;
    bloodStorage = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodStorage;
}

export async function createBloodStorage(payload) {
  console.log("🚀 ~ file: blood_storage.jsx ~ line 26 ~ createBloodStorage ~ payload", payload)
	let bloodStorage = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/blood_inventory/blood_processing/create/`,
      data: payload
		}).then(response => {
      return response;
    });

    // @ts-ignore
    bloodStorage = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}

	return bloodStorage;
}
