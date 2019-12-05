import {apiUserAccount, apiPostMethod, apiPutMethod} from 'shared_components/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import axiosCall from 'services/axiosCall';

export async function createUserAccountAPI(payload) {
	let createUserAccount = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: apiPostMethod,
      url: apiUserAccount,
      data: payload
		}).then(response => {
      return response;
    });
    // @ts-ignore
    createUserAccount = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	
  return createUserAccount;
}

export async function updateUserAccountAPI(payload) {
	let updateUserAccount = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: apiPutMethod,
      url: apiUserAccount,
      data: payload
		}).then(response => {
      return response;
    });
    // @ts-ignore
    updateUserAccount = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	
  return updateUserAccount;
}