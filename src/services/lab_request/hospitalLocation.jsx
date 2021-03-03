import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';


async function hospitalLocationAPI() {
	let hospitalLocations = [];
	
  try{
    const response = await axiosLabAPI({
      method: API_GET_METHOD,
      url: 'lab/HospitalLocation'
		});
		
		const { data } = response;
    hospitalLocations = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return hospitalLocations;
}

export default hospitalLocationAPI;