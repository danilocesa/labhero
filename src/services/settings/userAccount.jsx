import {apiUserAccount, API_POST_METHOD, API_PUT_METHOD, API_GET_METHOD} from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import { axiosLabAPI } from 'services/axios';

export async function createUserAccountAPI(payload) {
	let createUserAccount = [];
	
  try{
    const axiosResponse = await axiosLabAPI({
      method: API_POST_METHOD,
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
      method: API_PUT_METHOD,
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
      method: API_GET_METHOD,
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

export async function getUserAccountById(id){
  let userAccount = null;
	
  try{
    const response = await axiosLabAPI({
      method: API_GET_METHOD,
		  url: `/lab/UserAccount/UserId/${id}`
    });
    
    const { data } = response;
    userAccount = data;
  } 
  catch(e) {
    HttpCodeMessage({ status: 500, message: e });
	}
	
  return userAccount;

}