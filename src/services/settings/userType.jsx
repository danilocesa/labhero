import {apiUserType, API_GET_METHOD} from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import { axiosLabAPI } from 'services/axios';

export async function getAllUserTypesAPI(payload) {
	let getAllUserTypes = [];
	
  try{
    const axiosResponse = await axiosLabAPI({
      method: API_GET_METHOD,
      url: apiUserType,
      data: payload
		}).then(response => {
      return response;
    });
    // @ts-ignore
    getAllUserTypes = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	
  return getAllUserTypes;
}

export default getAllUserTypesAPI;