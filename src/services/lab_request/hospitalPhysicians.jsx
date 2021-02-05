import Message from 'shared_components/message';
import { axiosLabAPI } from '../axios';
import { API_GET_METHOD } from 'global_config/constant-global';

async function hospitalPhysiciansAPI() {
	let physicians = [];
	
  try{
    const response = await axiosLabAPI({
      method: API_GET_METHOD,
      url: 'lab/HospitalPhysician'
		});
		
		const { data } = response;

		physicians = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return physicians;
}

export default hospitalPhysiciansAPI;