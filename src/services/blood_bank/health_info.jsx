import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod } from 'global_config/constant-global';

export default async function fetchHealthInfoById(id) {
	let healthInfo = ;
	
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
			url: `health_info/${id}`,
		});
		
		const { data } = response;
    bloodgroupItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodgroupItems;
}