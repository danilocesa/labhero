import { API_GET_METHOD, API_POST_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import { axiosLabAPI } from 'services/axios';

export async function getUserTypes() {
  try{
    const axiosResponse = await axiosLabAPI({
      method: API_GET_METHOD,
      url: `lab/UserType`,
		})
    
    return axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({ status: 500, message: e });

    return [];
	}
}

export async function getUserTypesById(id) {
  try{
    const axiosResponse = await axiosLabAPI({
      method: API_GET_METHOD,
      url: `/lab/UserType/${id}`,
		})

    return axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({ status: 500, message: e });

    return false;
	}
}


export async function createUserType(payload) {
  try{
    const axiosResponse = await axiosLabAPI({
      method: API_POST_METHOD,
      url: `/lab/UserType`,
      data: payload
		})

    return axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({ status: 500, message: e });

    return false;
	}
}


export async function updateUserType(payload) {
  try{
    const axiosResponse = await axiosLabAPI({
      method: API_POST_METHOD,
      url: `/lab/UserType/update`,
      data: payload
		})

    return axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({ status: 500, message: e });

    return false;
	}
}

