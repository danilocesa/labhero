import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';

export async function fetchHealthInfoById(id) {
	let healthInfo = {};
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/bloodbank/health_info/${id}`,
		});
		
		const { data } = response;
    healthInfo = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return healthInfo;
}

export async function createHealthInformation(payload) {
  let response = null;

  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/bloodbank/health_info/create/`,
      data: payload
		});

    response = axiosResponse;
  }
  catch(e) {
    return false;
	}

	return response;
}



export async function updateHealthInformation(payload) {
  let response = null;

  try{
    const axiosResponse = await axiosPhase2API({
      method: API_PUT_METHOD,
      url: `/bloodbank/health_info/update/${payload.id}/`,
      data: payload
		});

    response = axiosResponse;
  }
  catch(e) {
    return false;
	}

	return response;
}