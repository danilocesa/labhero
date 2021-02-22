import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export async function getHospitalList() {
	let hospitals = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `general_settings/hospitals/`,
		});
		
		const { data } = response;
    hospitals = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return hospitals;
}