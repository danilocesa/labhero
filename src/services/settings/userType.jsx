import {apiUserType, apiGetMethod} from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import axiosCall from 'services/axiosCall';

export async function getAllUserTypesAPI(payload) {
	let getAllUserTypes = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: apiGetMethod,
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