import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod, apiPostMethod, apiPutMethod } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export default async function fetchBloodGroupItems() {
	let bloodgroupItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
			url: `bloodbank/bloodgroup/search/`,
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
      method: apiPostMethod,
      url: `bloodbank/bloodgroup/create/`,
      data: payload
		}).then(response => {
      return response;
    });

    console.log("API response",axiosResponse)
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
  const bloodGroupId = payload.blood_group_id;

try{
  const content = {
          method: apiPutMethod,
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

