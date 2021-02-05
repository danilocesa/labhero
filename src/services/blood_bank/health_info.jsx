import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD } from 'global_config/constant-global';

export async function fetchHealthInfoById(id) {
	let healthInfo = {};
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `health_info/${id}`,
		});
		
		const { data } = response;
    healthInfo = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return healthInfo;
}

export async function createHealthInformation() {

  let HealthInformation = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/bloodbank/health_info/create/`,
      //data: 
		}).then(response => {
      return response;
    });

    // @ts-ignore
    HealthInformation = axiosResponse;
  } 
  catch(e) {
   Message.error();
	}

	return HealthInformation;
}