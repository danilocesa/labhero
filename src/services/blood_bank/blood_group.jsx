import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export default async function fetchBloodGroupItems() {
	let bloodgroupItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `bloodbank/bloodgroup/`,
		});
		
		const { data } = response;
    bloodgroupItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodgroupItems;
}

export async function createBloodGroupAPI(payload) {
	let createUserAccount = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `bloodbank/bloodgroup/create/`,
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

export async function updateBloodGroupAPI(payload) {
  let updateBloodGroup = [];
  const bloodGroupId = payload.blood_type_id;

  try{
    const content = {
      method: API_PUT_METHOD,
      url:`bloodbank/bloodgroup/update/${bloodGroupId}/`,
      data: payload
    }

    const response = await axiosPhase2API(content);
    // @ts-ignore
    updateBloodGroup = await response;
  }
  catch(error) {
    Message.error();
  }

  return updateBloodGroup;
}

