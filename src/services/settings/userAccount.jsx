import {apiUserAccount, apiPostMethod, apiPutMethod, apiGetMethod} from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import { axiosLabAPI } from 'services/axios';

export async function createUserAccountAPI(payload) {
	let createUserAccount = [];
	
  try{
    const axiosResponse = await axiosLabAPI({
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
    const axiosResponse = await axiosLabAPI({
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

export async function getUserAccountsAPI(){
  let getUserAccounts = [];
	
  try{
    const axiosResponse = await axiosLabAPI({
      method: apiGetMethod,
      url: apiUserAccount
		}).then(response => {
      return response;
    });
    // @ts-ignore
    getUserAccounts = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	
  return getUserAccounts;

}