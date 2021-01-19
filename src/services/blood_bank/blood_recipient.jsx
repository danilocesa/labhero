import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod, apiPostMethod, apiPutMethod } from 'global_config/constant-global';

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